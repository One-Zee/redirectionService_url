/**
 * loading dependencies
 */
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



const { exp ,ifExists ,checkIf} = require('./redirect');
 

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


/**
 * Initializing # GET # request
 */
app.get('/:hash', ifExists, checkIf, exp);
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