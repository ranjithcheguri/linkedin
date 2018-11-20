var mongoose = require('mongoose');

const messagesschema= new mongoose.Schema({
    person = Array,
    messages : [{
        from    : String,
        msg     : String,
        status  : String
    }],
    
    
})
var messages = mongoose.model('messages',messagesschema);

module.exports = {applicantProfiles};