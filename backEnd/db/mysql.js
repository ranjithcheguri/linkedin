const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'cmpe273db.cqumuz1tfjsq.us-east-1.rds.amazonaws.com',
    user: 'admin',
    database: 'cmpe273db',
})

module.exports = pool;