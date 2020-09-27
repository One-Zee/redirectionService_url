/**
 * loading dependencies
 */
const rateLimit = require('express-rate-limit');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

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
 * Config for limiter
 */
const limiter = rateLimit({
    windowMs:2 * 60 * 1000, // 2 minutes or 120 sec
    max: 10, // limit each # IP # to 10 requests per windowMs
    message:
    "Too many request from this IP, please try again after couple minutes"
  });
  

/**
 * Initializing # express app #
 */
const app = express();

/**
 * Initialize middleware
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

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