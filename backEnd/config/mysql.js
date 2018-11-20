
var mysql=require('mysql')

  var pool = mysql.createPool({
  connectionLimit: 200,
  host: "cmpe273db.cqumuz1tfjsq.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "cmpe273db",
  database: "cmpe273db",
  port:'3306',
  insecureAuth : true,
  connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 2000,
    timeout         : 60 * 60 * 1000,
})

module.exports = pool;

// var con = mysql.createConnection({
//   host: "cmpe273db.cqumuz1tfjsq.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "cmpe273db",
//   database: "cmpe273db",
//   port:'3306',
//   insecureAuth : true
// });

// module.exports = con;
