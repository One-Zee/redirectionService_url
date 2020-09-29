/**
 * loading dependencies
 */
const redis = require('redis');

const config = require('../../config');


const client = redis.createClient(  // Creating redis # client #
  {
     host:config.redis_host,
     port:config.redis_port
  }); 
  

/**
 * Checks the connection to 'redis'
 */
client.on('connect',()=>{
    console.log('connected to redis client...');
});
client.on("error", function(error) {
    console.error(error);
  });

/**
 * Exporting  # client #
 */
module.exports = client;