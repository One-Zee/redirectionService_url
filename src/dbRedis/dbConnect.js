/**
 * loading dependencies
 */
const redis = require('redis');

const client = redis.createClient(); // Creating redis # client #

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