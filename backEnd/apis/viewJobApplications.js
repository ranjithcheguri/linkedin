var router = require('express').Router();
var kafka = require('../kafka/client');

router.get('/jobApplication', (req, res) => {
    console.log("Inside job Application List GET request");
    //let jobID = req.query.jobId;
    kafka.make_request('viewJobApplications', req.query, (err, results) => {
        console.log("In node kf --> Post Message Handler")
        if (err) {
            console.log("Error occured")
            res.json({ status: "error", msg: "System error" })
            res.sendStatus(400).end();
        }
        else {
            console.log("Got results in node kf")
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })  
})

module.exports = router;