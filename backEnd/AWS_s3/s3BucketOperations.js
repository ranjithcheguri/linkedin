var router = require('express').Router();
// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser');

// var express=require('express')
// var bodyParser=require('body-parser')
// const app = express();
// app.use(busboy());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(busboyBodyParser());

const Busboy = require('busboy');
const AWS = require('aws-sdk');
var AWS_CREDS = require('../config/config')
var path = require('path');
var fs = require('fs');

uploadToS3 = (file, email, fileType) => {

    let filePathInAws;
    let extension = path.extname(file.name);
    switch (fileType) {
        case "resume": filePathInAws = "Resumes/" + email + extension; break; //  Resumes/email@gmail.com.pdf
        case "profilePic": filePathInAws = "profilePics/" + email + extension; break;
        case "coverPic": filePathInAws = "coverPics/" + email + extension; break;
        case "logo": filePathInAws = "logos/" + email + extension; break;
    }

    console.log("Inside AWS_s3/upload/uploadToS3()")
    console.log("Uploading file to S3 bucket....")

    //it accesses s3 bucket
    let s3bucket = new AWS.S3({
        accessKeyId: AWS_CREDS.IAM_USER_KEY,
        secretAccessKey: AWS_CREDS.IAM_USER_SECRET,
        Bucket: AWS_CREDS.BUCKET_NAME,
    });
    s3bucket.createBucket(async function () {
        var params = {
            Bucket: AWS_CREDS.BUCKET_NAME,
            Key: filePathInAws,
            Body: file.data,
        };
        //Inbuilt access moethod to upload a file to s3
        await s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log("Resume pushed is...", data);
            console.log('Resume uploaded successfully!');
        });
    });
}

downloadFromS3 = (req,res) => {
    console.log("inside download from s3 method ...")
        let s3bucket = new AWS.S3({
            accessKeyId: AWS_CREDS.IAM_USER_KEY,
            secretAccessKey: AWS_CREDS.IAM_USER_SECRET,
            Bucket: AWS_CREDS.BUCKET_NAME,
        });
        s3bucket.createBucket( async function (){
            var params = {
                Bucket: AWS_CREDS.BUCKET_NAME,
                Key: "Resumes/ranjith@g.com.pdf",
            };

            await s3bucket.getObject(params, function (err, data) {
                if (err) {
                    console.log('error in callback');
                    console.log(err);
                }
                console.log('data retrieval from AWS success...');
                console.log(data);
                //res.setHeader('Content-disposition', 'attachment; filename=abcd1@gmail.com.jpg')
                //res.setHeader('Content-length', data.ContentLength);    
                res.end(new Buffer(data.Body.toString('base64')));
            })
        });
}

module.exports = router;
module.exports.uploadToS3 = uploadToS3;
module.exports.downloadFromS3 = downloadFromS3;
