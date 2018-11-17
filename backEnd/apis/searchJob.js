var router = require('express').Router();
var pool = require("../db/mysql");
var mysql = require('mysql');

router.get('/searchjob', function (req, res) {
    console.log("Inside job search");

    if (req.query.title != null || req.query.industry != null || req.query.employment_type != null || req.query.location != null) {
    
        var sql = "SELECT * from `job` WHERE `title` = "
            + mysql.escape(req.query.title) + " OR " + "`industry` = "
            + mysql.escape(req.query.industry) + " OR " + "`employment_type` = "
            + mysql.escape(req.query.employment_type) + " OR " + "`location` = "
            + mysql.escape(req.query.location) + ";"
    }
    else {
        var sql = "SELECT * from `job`;"
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
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(result)); //error here 

                }
            });
        }
    })
});

module.exports = router;
