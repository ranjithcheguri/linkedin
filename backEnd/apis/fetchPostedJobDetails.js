var router = require('express').Router();
var {jobApplications}  = require('../models/jobApplication');
const pool = require('../db/mysql');


router.get('/getTop10', (req, res) => {
    console.log("Inside getTop10 GET request");
    let recEmail = req.query.email;
    let jobID = req.query.jobID;
    console.log(typeof recEmail,recEmail);
    let sql = `select * from cmpe273db.job where recruiter_email="${recEmail}" order by  posted_date_time asc limit 10;`;
    pool.getConnection((err, con) => {
        if(err){
            console.log("Connection Error");
            res.send({ 
                status  : 400, 
                message : 'Could Not Get Connection Object' 
            });
        } else{
            con.query(sql, (err, results) => {
                con.release();
                if(err){
                    console.log("Error executing SQL statement",err);
                    res.send({ 
                        status  : 400, 
                        message : 'Incorrect SQL statement' 
                    });
                } else{
                    //console.log("Jobs posted by you are...................",results);

                    let jobIDsToFind=[]
                    results.forEach((ele)=>{
                        jobIDsToFind.push(ele.job_id);
                    })

                    console.log("Job ID's to find....",jobIDsToFind)

                }
            })
        }
    })
})


module.exports = router;
