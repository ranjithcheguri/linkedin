var mongoose = require('mongoose');

const messagesschema= new mongoose.Schema({
    person1 :{
        type : String
    },
    person2 :{
        type : String
    },
    messages : [{
        from    : String,
        msg     : String,
        status  : String
    }],
    
    
})
var messages = mongoose.model('messages',messagesschema);

module.exports = {applicantProfiles};