/**
 * Manage express routing for web server.
 */
const compression = require('compression')
const express = require('express')
const path = require('path')

const environ = process.env.NODE_ENV || 'development'

module.exports = (app) => {
  // Serve GUI from bundled production build files if not in development.
  if (environ !== 'development') {
    app.use(compression())
    // This is middleware, if it can resolve the request from the file system it 
    // will return the file, otherwise call next to move on to routes.   
    app.use('/analytics', express.static(__dirname + '/../../client/build'))
    // This is router middleware, and will match all other requests to index.html, which is
    // what we want to support client side routing. 
    app.get('/analyticss/*', function (req, res) {
      res.sendFile(path.join(__dirname, '/../../client/build', 'index.html'))
    });
  }

  app.disable('x-powered-by')
}