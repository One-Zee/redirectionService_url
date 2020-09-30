# Redirection Service_url

## Description

Redirection Service is one the services that are used for URL Shortening , another service is Management service: https://github.com/One-Zee/managmentService_url .The Redirection service will find real URL, based on hash part of the short URL and the user will be redirected to real URL. Redirection accepts information about short URLs through RabbitMQ. In the case of creating short URL on Management Service, the information will be stored in Redis on Redirection Service, while in the case of deleting short URL, the information will be deleted from Redis on Redirection Service.


## Installation

`npm install`

## Start

Run server with:
`npm run start`

or using nodemon for development run:
`npm run dev`

Development is running at `http://localhost:2222` by default.

## Docker

To run both services with DOCKER checkout:
- https://github.com/One-Zee/url_shortening




Redirection service has one RESTful API route:

- GET method
- Redirect_route:
  - `http://localhost:2222/:hash`
  
- expects hash code in url params like shown bellow.

 - example of request url `http://localhost:2222/U80mNPgts`
 
 - response is redirection to long(real) url for example :
   - `https://www.nsoft.com/job-application/?job_id=7661`
  
