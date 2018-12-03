var router = require('express').Router();
var { connections } = require('../models/connections');

router.put('/acceptConnection', function (req, res) {
    console.log("Inside  Accept connection : ");
    if(req.body.status==1){

    }
    console.log(req.body)
    connections.updateOne({ from: req.body.from, to:req.body.to }, { $set: { status: req.body.status } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error accepting connection");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("connection accepted! ", result);
            connections.updateOne({ from: req.body.to, to:req.body.from }, { $set: { status: req.body.status } }, { upsert: true }, function (err, result) {
                if (err) {
                    console.log("Error accepting connection");
                    console.log(err)
                    
                }
                else if (result) {
                    console.log("connection accepted! ", result);
                    
                }
            res.sendStatus(200).end();
        })}
    })
})

router.put('/declineConnection', function (req, res) {
    console.log("Inside  Accept connection : ");
    console.log(req.body)
    connections.updateOne({ from: req.body.from, to:req.body.to }, { $set: { status: req.body.status } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error accepting connection");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("connection Declined! ", result);
            res.sendStatus(200).end();
        }
    })
})

module.exports = router;