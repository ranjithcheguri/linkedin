var router = require('express').Router();
var { applicantProfiles } = require ('../models/applicantProfile');
var kafka = require('../kafka/client');

router.get('/userProfile/', (req, res) => {
    console.log("Inside user profile List GET request");
    var email = req.query.email;
    console.log(email)
    applicantProfiles.find({
        email:email,
    }, (err, results) => {
        if(err){
            console.log("Error finding mongo results for User Profile");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for User Profile");
        } else {
            console.log("Successfully retrieved User Profile");
            res.writeHead(200, {
                'Content-type' : 'application/json',
            })
            console.log(results)
            res.end(JSON.stringify(results));
        }
    })
})

module.exports = router;