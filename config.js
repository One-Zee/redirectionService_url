const config = {

    // # PORT # // 
        PORT: 2222,

    // connection settings for # rabitMQ # //   
        rabbitSettings : {
            protocol:'amqp',
            hostname:'rabbitmq',
            port: 5672,
            username:'guest',
            password:'guest',
            vhost:'/',
            authMechanism:['PLAIN','AMQPLAIN','EXTARNAL'] 
        },
      //  rabbitUrl: 'amqp://rabbitmq:5672',
        queueName: 'urls',

        redis_host: 'redis',
        redis_port: 6379

  };


  
/**
 * exporting values(config)
 */
  module.exports = config;