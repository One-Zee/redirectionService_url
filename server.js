/**
 * loading dependencies
 */
const express = require('express');

/**
 * loading config values
 */
const config = require('./config');

/**
 * setting port
 */
const PORT = process.env.PORT || config.PORT;


/**
 * Initializing # express app #
 */
const app = express();

/**
 * Initialize middleware
 */
app.use(express.json());


 /**
 * Initializing and listening to # PORT #
 */
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
});