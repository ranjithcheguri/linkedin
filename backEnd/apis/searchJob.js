var router = require('express').Router();

router.post('/recruiter/searchJobs', function (req, res) {
    console.log("Inside job search");

    jobApplications.find({

    })
    .then((result) => {
        console.log("fetched job search results : ", result);
        res.sendStatus(200).end();
    }, (err) => {
        console.log("Error fetching jobs");
        console.log(err)
        res.sendStatus(400).end();
    })
});

module.exports = router;
