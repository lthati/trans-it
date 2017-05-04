/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var path = require('path');
var url = require('url');

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var env = app.get('env');

var rootPath = '';
if ('production' === env) {
    rootPath = config.root + '../index.html'
} else {
    rootPath = config.root + '../index.html'
}

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

//app.on('stormpath.ready', function () {
    // Start server
    server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
//});
// Expose app
exports = module.exports = app;