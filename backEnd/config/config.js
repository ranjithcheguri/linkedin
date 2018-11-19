//const CORS_ORIGIN = 'http://ec2-13-58-95-68.us-east-2.compute.amazonaws.com:3000';
const PORT = '3002';
const IP_MONGODB_DATABASE = 'mongodb://user:cmpe273@ds257579.mlab.com:57579/linkedin';
const IP_KAFKA = 'localhost:2181';
const CORS_ORIGIN = 'http://localhost:3000';

//AWS credentials
const BUCKET_NAME = 'cmpe273';
const IAM_USER_KEY = 'AKIAJ7VFZCRVNQACNQUQ';
const IAM_USER_SECRET = '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';

exports.CORS_ORIGIN = CORS_ORIGIN;
exports.PORT = PORT;
exports.IP_MONGODB_DATABASE = IP_MONGODB_DATABASE;
exports.IP_KAFKA = IP_KAFKA;
exports.BUCKET_NAME=BUCKET_NAME;
exports.IAM_USER_KEY=IAM_USER_KEY;
exports.IAM_USER_SECRET=IAM_USER_SECRET;