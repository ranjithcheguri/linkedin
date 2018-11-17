var router = require('express').Router();
var { jobApplications } = require('../models/jobApplication');

router.get('/jobApplication', (req, res) => {
    console.log("Inside job Application List GET request");
    let jobID = req.query.jobId;
    jobApplications.find({
        jobID,
    }, (err, results) => {
        if(err){
            console.log("Error finding mongo results for Job Applications");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for Job Applications");
        } else {
            console.log("Successfully retrieved job Applications");
            res.writeHead(200, {
                'Content-type' : 'application/json',
            })
            res.end(JSON.stringify(results));
        }
    })
})

module.exports = router;