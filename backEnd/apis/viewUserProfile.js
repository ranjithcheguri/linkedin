var router = require('express').Router();
var { applicantProfiles } = require ('../models/applicantProfile');

router.get('/userProfile', (req, res) => {
    console.log("Inside user profile List GET request");
    let emailID = req.query.email;
    applicantProfiles.find({
        emailID,
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
            res.end(JSON.stringify(results));
        }
    })
})

module.exports = router;