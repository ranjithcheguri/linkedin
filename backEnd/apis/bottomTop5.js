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
            $limit : 5 
        }
      ], function(err, jobsIDs) {
            if(err){
                console.log("Error occurred....")
                res.send({
                    status  : 400,
                    message : "Failed while fetching top 5 job posting with less number of applications"
                })
            }else{
                console.log("Success....",jobsIDs)
                res.send({ 
                    status      : 200,
                    message     : "Successfully fetched top 5 job posting with less number of applications",
                    jobs        : jobsIDs
                })
            }
      });
});

module.exports = router;
