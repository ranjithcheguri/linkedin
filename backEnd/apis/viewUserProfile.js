// var router = require('express').Router();
// var { applicantProfiles } = require ('../models/applicantProfile');
// var kafka = require('../kafka/client');

// router.get('/userProfile', (req, res) => {
//     console.log("Inside user profile List GET request");
//     //console.log(email)
//     kafka.make_request('viewUserProfiles', req.query, (err, results) => {
//         console.log("In node kf --> Post Message Handler")
//         if (err) {
//             console.log("Error occured")
//             res.json({ status: "error", msg: "System error" })
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("Got results in node kf")
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//         }
//     })  
// })

// module.exports = router;

var router = require('express').Router();
var { applicantProfiles } = require('../models/applicantProfile');
var AWS_operations = require('../AWS_s3/s3BucketOperations');

router.get('/userProfile', (req, res) => {
    console.log("Inside user profile List GET request");
    var email = req.query.email;
    console.log(email)
    applicantProfiles.find({
        email: email,
    }, (err, results) => {
        if (err) {
            console.log("Error finding mongo results for User Profile");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for User Profile");
        } else {
            console.log("Successfully retrieved User Profile");
            res.writeHead(200, {
                'Content-type': 'application/json',
            })
            console.log(results)
            res.end(JSON.stringify(results));
        }
    })
})

router.get('/userProfile/getProfilePic', (req, res) => {
    console.log("Inside get profile pic");
    AWS_operations.downloadFromS3(req,res);
})


module.exports = router;