var router = require('express').Router();
var {jobApplications}  = require('../models/jobApplication');
var mongoose = require("mongoose");

router.get('/bottomTop5', function (req, res) {
    console.log("inside top 5 job posting with less number of applications");
  

    jobApplications.aggregate([
        {
            $group: {
                _id     : "$jobID",
                count   : { $sum  : 1 }
            }
        },
        { 
            $sort : { 
                count : 1 
            } 
        },
        {
            $limit : 3 
        }
      ], function(err, jobsIDs) {
            if(err){
                console.log("Error occurred....")
                res.send("Failed");
            }else{
                console.log("Success....",jobsIDs)
                res.send({ 
                    status      : 200,
                    message     : "Successfully fetched top 5 job posting with less number of applications",
                    jobs        : jobsIDs
                })
            }
      });

    // messagesModule.find({participants : {$all : parties}}, function (err, result) {
    //     if(err){
    //         callback(null, {
    //             status  : 400,
    //             message : "Failed fetching message details beteween these two users."
    //         })
    //     }else{
    //         console.log("Result of finding the participant:",result,"Message id",req.body.msg_id);
    //         if(result.length>0){
    //             messagesModule.update({participants : {$all : parties}}, 
    //                {$set : { "messages.$[elem].status": "R"}},
    //                {"arrayFilters" : [{"elem._id" : mongoose.Types.ObjectId(req.body.msg_id)}]},
    //                 function(err, resul) {
    //                 console.log("Result of finding particular message.......",resul);
    //                 if (err) {
    //                   console.log("Error is -",err)
    //                   res.send({
    //                     status      : 400,
    //                     message     : "Something went wrong while changing the message status as read"
    //                   })
    //                 }else{
    //                     res.send({ 
    //                         status      : 200,
    //                         message     : "Successfully changes the message status to read"
    //                     })
    //                 }
    //               });
    //         }else{
    //                 res.send({
    //                     status      : 204,
    //                     message     : "No messages found for these users"
    //                 })
    //         }
    //     }
    // });

    
});

module.exports = router;
