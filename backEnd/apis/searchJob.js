var router = require('express').Router();
var pool = require("../db/mysql");
var mysql = require('mysql');

router.post('/searchjob', function (req, res) {
    console.log("Inside job search");
    console.log(req.body.experience_level)
    var searchjob="%"+req.body.searchjob+"%"
    var searchlocation="%"+req.body.searchlocation+"%"
    
    var experience_level=  "internship" +"," +'entrylevel'
      console.log(searchjob)

    if (req.body.searchjob != null || req.body.searchlocation != null) {
        var a=req.body.experience_level
    if(a===null || a===""){
        experience_level="internship,director,entrylevel"
        experience_level=experience_level.split(",")
    }
    else{
         experience_level=req.body.experience_level.split(",")
    }
    console.log(req.body.experience_level.split(","))
    
        var sql = "SELECT * from `job` WHERE title like "
            + mysql.escape(searchjob) + "AND " + "location like "
            + mysql.escape(searchlocation) + "AND experience_level IN ("+mysql.escape(experience_level)+");"
    }
    else {
        var sql = "SELECT * from `job` limit 3;"
    }

    console.log(sql);

    pool.getConnection(function (err, con) {
        if (err) {
            console.log("SQL connection error");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            //res.send("Could Not Get Connection Object");
        } else {
            console.log("connection to db successfull");
            con.query(sql, function (err, result) {
                if (err) {
                    console.log("******** Error in fetching jobs ******");
                    console.log(err);
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    //res.send("Invalid Credentials");
                } else {
                    console.log(result);
                    //send result
                    // res.writeHead(200, {
                    //     'Content-Type': 'application/json'
                    // })
                    // res.end(JSON.stringify(result)); //error here 
                    res.status(200).json({ success: true, result:result });
                }
            });
        }
    })
});

module.exports = router;
