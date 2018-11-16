var mongoose = require('mongoose');

const recruiterProfileschema= new mongoose.Schema({
    remail :{
        type : String,
        required:true,
        unique:true
        
    },
    rfName : {
        type : String
    },
    rlName : {
        type : String
    },
    raddress : {
        type : String
    },
    rcity : {
        type : String
    },
    rstate : {
        type : String
    },
    rzcode : {
        type : String
    },
    rphone : {
        type : String
    },
    rcompany : {
        type : String
    },
    
    
})
var recruiterProfiles = mongoose.model('recruiterProfile',recruiterProfileschema);

module.exports = {recruiterProfiles};