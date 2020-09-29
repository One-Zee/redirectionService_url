/**
 * loading dependencies
 */
const amqp = require('amqplib');  

/**
 * loading # config # values
 */
const config = require('../../config');

/**
 * loading db # redis # client
 */
const client = require('../dbRedis/dbConnect');

/**
 * Transforming object to array 
 * so it can be sent to # redis #
 */
function toArray(hash,url){
    let array = [];
    Object.entries(url).forEach(el=>{
      array.push(...el);
    });
    array.unshift(hash);
    return array;
}

/**
 * exporting # consumer #
 */
module.exports = async function conn(){
    const queue = config.queueName;
    
try{
    const conn = await amqp.connect(config.rabbitSettings);  // Creating a # connection #
    console.log('Connection Created...');

    const channel =  await conn.createChannel()  // Creating a new # channel # 
    console.log('Channel Created...');

    const res = await channel.assertQueue(queue); // Creating # queue # if it does not exist.
    console.log('Queue created...')

    await channel.consume(queue, msg =>{                    // Consumes message from specif 'queue'.
        let url = JSON.parse(msg.content.toString());       // Parses the 'msg' sent from queue  that is converted 'to string' from 'buffer'.
       // console.log(url);
        let url_arr = url[1].short_url.split('/');
        const hash = url_arr[url_arr.length-1];  // Exctracting hash part of the 'short_url'

        if(url[0].create){ // Checks if it should create to or delete from db # Redis # 'create' returns boolean
            client.hmset(toArray(hash,url[1]),(err, reply) => {
                if(err){
                        console.log(err);
                    }else{
                        channel.ack(msg);
                        console.log('inserted into redis')
                        console.log('deleted from queue');
                    }  
        });
        }else{
            client.del(hash,(err, reply) => {
                if(err){
                    console.log(err);
                    }else{
                        channel.ack(msg);
                        console.log('deleted from queue and from redis');
                    }
            });
        }

       
    }, {
    // manual acknowledgment mode,
    noAck: false
  });
}
catch(err){
console.log('error is ' + err);
process.exit(1);    

}
}