'use strict';
var express = require('express');
var kraken = require('kraken-js');
var path = require('path');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
  onconfig: function (config, next) {
    /*
     * Add any additional config setup or overrides here. `config` is an initialized
     * `confit` (https://github.com/krakenjs/confit/) configuration object.
     */

    next(null, config);
  }
};

app = module.exports = express();

const cors = require('cors')

app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(__dirname + '/dist/build')); // set the static files location /public/img will be /img for users


global.log = require('./app/lib/logger');
global.appRoot = path.resolve(__dirname);

global.kraken = app.kraken;
app.use(kraken(options));
app.on('start', function () {
  global.log.info('Application ready to serve requests.');
  global.log.info('Environment: %s', app.kraken.get('env:env'));
});
