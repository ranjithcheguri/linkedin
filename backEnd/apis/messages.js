var router = require('express').Router();
var { messages } = require('../models/messages');

router.post('/messgaes', function (req, res) {
    console.log("POST messages route");
    console.log("Received files: ",req.body);
    
    
    
});

module.exports = router;
