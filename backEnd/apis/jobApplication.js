var router = require('express').Router();
var { jobApplications } = require('../models/jobApplication');

router.post('/jobApplication/apply', function (req, res) {
    console.log("Inside job application");
    var jobApplication = new jobApplications({
        ...req.body
    });
    jobApplication.save().then((result) => {
        console.log("jobApplication inserted: ", result);
        res.sendStatus(200).end();
    }, (err) => {
        console.log("Error doing the job Application");
        console.log(err)
        res.sendStatus(400).end();
    })
    
});

module.exports = router;
