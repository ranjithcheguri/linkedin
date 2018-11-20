// Create a Redis client
const redis = require('redis');
let client = redis.createClient();

client.on('connect',function(){
    console.log("Connected to Redis!")
})

module.exports={client}