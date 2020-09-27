const config = {

    // # PORT # // 
        PORT: 2222,

    // connection settings for # rabitMQ # //   
        rabbitSettings : {
            protocol:'amqp',
            hostname:'localhost',
            port: 5672,
            username:'guest',
            password:'guest',
            vhost:'/',
            authMechanism:['PLAIN','AMQPLAIN','EXTARNAL'] 
        },
        queueName: 'urls'
  };
  
/**
 * exporting values(config)
 */
  module.exports = config;