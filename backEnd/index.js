var ENV_VAR = require('./config/config');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');


//Route imports
var jobApplication = require('./apis/jobApplication');
var updateProfiles = require('./apis/updateProfiles');
var postJob = require('./apis/postJob');
var searchPostedJob = require('./apis/searchPostedJob')
var viewParticularAppDetails = require('./apis/viewParticularAppDetails')
var viewPostedJob = require('./apis/viewPostedJob');
var editPostedJob = require('./apis/editPostedJob');
var viewJobApplications = require('./apis/viewJobApplications');


//Only for AWS
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser());


//Mongo connection
var { mongoose } = require('./db/mongoose');

//Redis connection
const redis = require('redis');
require('./Redis/connectRedis')

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

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', ENV_VAR.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



//Route imports
var viewUserProfile = require('./apis/viewUserProfile');
var deleteUserProfile = require('./apis/deleteUserProfile');
var jobApplication = require('./apis/jobApplication');
var updateProfiles = require('./apis/updateProfiles');
var searchJob = require('./apis/searchjob');
var postJob = require('./apis/postJob');
var searchPostedJob = require('./apis/searchPostedJob')
var viewParticularAppDetails = require('./apis/viewParticularAppDetails')
var viewPostedJob = require('./apis/viewPostedJob');
var editPostedJob = require('./apis/editPostedJob');
var viewJobApplications = require('./apis/viewJobApplications');
var savejob = require('./apis/saveJob');
var getAllMessages = require('./apis/getAllMessages');
var getParticularMessages = require('./apis/getParticularMessages');
//Aws s3 upload/import method
var resumeupload = require('./AWS_s3/s3BucketOperations');
var makeConnection = require('./apis/makeConnection');
var acceptConnection = require('./apis/acceptConnection');

//This route is used to view the user profile by email
app.use('/', viewUserProfile);
//This route is used to delete the user profile by email
app.use('/', deleteUserProfile);
app.use('/', jobApplication);
app.use('/', updateProfiles);
// applicant job search results.
app.use('/', searchJob);
app.use('/', viewPostedJob);
app.use('/', editPostedJob);
app.use('/', viewJobApplications);
//save Job
app.use('/', savejob)
//This route is used to post a job
app.use('/', postJob)
//This route is used to filter posted job
app.use('/', searchPostedJob)
//This route is used to view particular application details
app.use('/', viewParticularAppDetails)
//This is used to get all the messages of a particular user
app.use('/', getAllMessages);
//This is used to get the conversation between two users
app.use('/', getParticularMessages);
//Aws s3
app.use('/', resumeupload)
//send connection request
app.use('/', makeConnection)
//accept connection request
app.use('/', acceptConnection)




app.listen(ENV_VAR.PORT);
console.log("Server running on port " + ENV_VAR.PORT);