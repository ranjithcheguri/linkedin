var router = require('express').Router();
var { applicantProfiles } = require('../models/applicantProfile');
var { recruiterProfiles } = require('../models/recruiterProfile');
// Two ways of upserting the documents.
router.put('/applicant/updateProfile', function (req, res) {
    console.log("Inside Applicant update handler",req.body);
    applicantProfiles.updateOne({ email: req.body.email }, { $set: { ...req.body } }, { upsert: true }, function (err, result) {
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
});

router.put('/recruiter/updateProfile', function (req, res) {
    console.log("Inside Recruiter update handler");
    recruiterProfiles.findOneAndUpdate({ email: req.body.email }, { $set: { ...req.body } }, { upsert: true, new:true }, function (err, result) {
        if (err) {
            console.log("Error updating the Profile information.");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("Recruiter Profile updated: ", result);
            res.sendStatus(200).end();
        }
    })
});

module.exports = router;
