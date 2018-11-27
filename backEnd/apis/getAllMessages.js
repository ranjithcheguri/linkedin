const router = require('express').Router();
var Message = require('../models/messages');
var kafka = require('../kafka/client');

router.get('/messages', (req, res) => {
    console.log("Inside getAllMessages GET request");
    //const participantID = req.query.participantID;
    kafka.make_request('getAllMessages', req.query, (err, results) => {
        console.log("In node kf --> Post Message Handler")
        if (err) {
            console.log("Error retrieving message details")
            res.json({ status: "error", msg: "System error" })
            res.sendStatus(400).end();
        }
        else {
            console.log("Got results in node kf")
            console.log("Retrieved messages successfully");
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })   
    
})

module.exports = router;