var router = require('express').Router();
var { connections } = require('../models/connections');

router.put('/acceptConnection', function (req, res) {

    console.log("Inside  Accept connection : ");

    connections.updateOne({ from: req.body.from, to:req.body.to }, { $set: { status: req.body.status } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error accepting connection");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("connection accepted! ", result);
            res.sendStatus(200).end();
        }
    })
})

module.exports = router;