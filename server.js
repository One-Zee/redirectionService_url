/**
 * loading dependencies
 */
const express = require('express');

/**
 * loading config values
 */
const config = require('./config');

/**
 * Starting consumer connection
 */
require('./src/rabbitMQ/consumer')();  

/**
 * loading client # redis #
 */
const client = require('./src/dbRedis/dbConnect');

/**
 * Initializing # express app #
 */
const app = express();

/**
 * Initialize middleware
 */
app.use(express.json());

/**
 * Initializing # GET # request
 */
app.get('/:hash',(req,res)=>{
    const { hash } = req.params;
    
    client.hgetall(hash, function (err, obj) {
        console.dir(obj);
        if(err)
        res.status(401).end('err: '+ err);
        else if(obj != null)
        res.status(302).redirect(obj.real_url);
        else
        res.status(404).end();
        
    })
});
/**
 * setting port
 */
const PORT = process.env.PORT || config.PORT;


/**
 * Initializing and listening to # PORT #
 */
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
});