var router = require('express').Router();
var pool = require("../db/mysql");


//Route to handle Post Request Call
router.post('/postJob',function(req,res){

    console.log("Inside Post Job Request");
    console.log("Data received about the Job",req.body)
    let job=[
        req.body.title,
        req.body.description,
        req.body.industry,
        req.body.employment_type,
        req.body.location,
        req.body.job_function,
        req.body.no_of_applicants,
        req.body.no_of_views
    ]
    let sql='insert into job(title,description, industry, employment_type, location, job_function, no_of_applicants, \
             no_of_views) values(?,?,?,?,?,?,?,?)';
    
    pool.getConnection(function(err,con){
        if(err){
            //con.release();
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,job,(err, result)=>{
                con.release();
                if(err){
                    throw err;
                }else{
                    console.log('Posted the job details successfully into job table');
                    console.log("Result after inserting job details",result)
                    res.send({
                        status  : 200,
                        message : "Job posted successfully"
                    })
                }
            });
        }
    });
    
});


module.exports = router;
