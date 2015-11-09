/**
 * Express configuration
 */

'use strict';

var express = require('express');
// var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
// var xmlparser = require('express-xml-bodyparser');
// var methodOverride = require('method-override');
// var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
// var logger = require('express-bunyan-logger');

module.exports = function (app) {
	var env = app.get('env');

	app.set('views', config.root + '/app');
	// // app.set('views', config.root + '/server/views');
	// app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(compression());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());
	// app.use(xmlparser({
	// 	explicitArray: false
	// }));
	// app.use(methodOverride());
	// app.use(cookieParser());

	if ('production' === env) {
        app.use(express.static(path.join(config.root, '/public')));
        app.set('appPath', config.root + '/public');
        app.set('renderPath', config.root + '/public');
        app.use(morgan('dev'));
	}

    if ('stage' === env || 'test' === env) {
        app.use(express.static(path.join(config.root, '/public')));
        app.set('appPath', config.root + '/public');
        app.set('renderPath', config.root + '/public');
        app.use(morgan('dev'));
    }

	if ('development' === env || 'test' === env) {
		app.use(require('connect-livereload')());
		app.set('appPath', 'app');
		app.set('renderPath', 'app');
		app.use(express.static(path.join(config.root, '.tmp')));
		app.use(express.static(path.join(config.root, 'app')));
		app.use(morgan('dev'));
		app.use(errorHandler()); // Error handler - has to be last
	}
};
