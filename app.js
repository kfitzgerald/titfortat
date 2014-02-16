/**
 * Module dependencies.
 */

var config = require('./config');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var socket  = require('./lib/socket');

/*
 * EXPRESS & ENVIRONMENT
 */
var app = express();
app.set('config', config);
// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'twig');
app.set('twig options', {
    strict_variables: false
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
require('./lib/sql').configure(app);
require('./lib/passport').configure(app);
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// Routes
routes.configure(app);

/*
 * SOMEBODY SET US UP THE BOMB
 */
var server = http.createServer(app).listen(app.get('port'), function () {

    socket.configure(app, server);
	console.log('Express server listening on port ' + app.get('port'));
});
