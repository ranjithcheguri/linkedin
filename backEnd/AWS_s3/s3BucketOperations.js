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

uploadToS3=(file,email)=> {
    console.log("Inside AWS_s3/upload/uploadToS3()")
    console.log("Uploading file to S3 bucket....")

    //it accesses s3 bucket
    let s3bucket = new AWS.S3({
        accessKeyId: AWS_CREDS.IAM_USER_KEY,
        secretAccessKey: AWS_CREDS.IAM_USER_SECRET,
        Bucket: AWS_CREDS.BUCKET_NAME,
    });
    s3bucket.createBucket(function () {
        var params = {
            Bucket: AWS_CREDS.BUCKET_NAME,
            Key: Resumes/email+'.pdf',
            Body: file.data,
        };
        //Inbuilt access moethod to upload a file to s3
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log("Resume pushed is...", data);
            console.log('Resume uploaded successfully!');
        });
    });
}

// router.get('/api/download', function (req, res, next) {
//     let s3bucket = new AWS.S3({
//         accessKeyId: AWS_CREDS.IAM_USER_KEY,
//         secretAccessKey: AWS_CREDS.IAM_USER_SECRET,
//         Bucket: AWS_CREDS.BUCKET_NAME,
//     });
//     s3bucket.createBucket(function () {
//         var params = {
//             Bucket: AWS_CREDS.BUCKET_NAME,
//             Key: "img041.pdf",
//         };
//         s3bucket.getObject(params, function (err, data) {
//             if (err) {
//                 console.log('error in callback');
//                 console.log(err);
//             }
//             console.log('success');
//             console.log(data);
//             res.setHeader('Content-disposition', 'attachment; filename=img041.pdf')
//             res.setHeader('Content-length', data.ContentLength);
//             res.end(data.Body)
//         });
//     });
// });

module.exports = router;
module.exports.uploadToS3=uploadToS3
