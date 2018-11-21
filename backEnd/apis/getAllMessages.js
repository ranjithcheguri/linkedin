const router = require('express').Router();
var Message = require('../models/messages');

router.get('/messages', (req, res) => {
    console.log("Inside getAllMessages GET request");
    const participantID = req.query.participantID;
    Message.find({
        participants : participantID,
    },{ messages : {$slice : -1} },(err, results) => {
        if(err){
            console.log("Error retrieving message details");
            res.writeHead(400, {
                'Content-type' : 'text/plain'
            })
            res.end("Error retrieving message details");
        } else {
            console.log("Retrieved messages successfully");
            res.writeHead(200, {
                'Content-type' : 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })
})

module.exports = router;