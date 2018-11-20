var ENV_VAR = require('./config/config');
var pool = require('./config/mysql');
var mysql=require('mysql')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');

//Route imports
var signUp = require('./apis/signUp');
var userLogin = require('./apis/userLogin');
var jobApplication = require('./apis/jobApplication');
var updateProfiles = require('./apis/updateProfiles');

//Mongo connection
var { mongoose } = require('./db/mongoose');

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });




// Log requests to console
app.use(morgan('dev'));

app.use(cors({ origin: ENV_VAR.CORS_ORIGIN, credentials: true }));
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',ENV_VAR.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// create travelerLogin in apis and write code there.
//app.use('/', travelerLogin);
app.use('/',signUp);
app.use('/',userLogin)
app.use('/', jobApplication);
app.use('/', updateProfiles);

app.listen(ENV_VAR.PORT);
console.log("Server running on port " + ENV_VAR.PORT);