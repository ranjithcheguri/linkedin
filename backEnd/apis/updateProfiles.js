var router = require('express').Router();
var { applicantProfiles } = require('../models/applicantProfile');

router.post('/applicant/updateProfile', function (req, res) {
    console.log("Inside Applicant update handler");
    applicantProfiles.updateOne({
        //email: req.email
    }, { ...req.body }, function (err, result) {
        if (err) {
            console.log("Error updating the Profile information.");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("Applicant Profile updated: ", result);
            res.sendStatus(200).end();
        }
    })
    // jobApplication.save().then((result) => {

    // }, (err) => {

    // })

});

router.post('/recruiter/updateProfile', function (req, res) {
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
