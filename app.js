/**
 * Module dependencies.
 */

var config = require('./config');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mysql = require('mysql');

/*
 * EXPRESS & ENVIRONMENT
 */
var app = express();

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
 * DATABASE
 */
var sql;
function connectToDB(app) {

	sql = mysql.createConnection(config.mysql); // Recreate the connection, since
	// the old one cannot be reused.

	sql.connect(function (err) {                       // The server is either down
		if (err) {                                     // or restarting (takes a while sometimes).
			console.log('error when connecting to db:', err);
			setTimeout(connectToDB, 2000);             // We introduce a delay before attempting to reconnect,
		}                                              // to avoid a hot loop, and to allow our node script to
	});                                                // process asynchronous requests in the meantime.
	                                                   // If you're also serving http, display a 503 error.
	sql.on('error', function (err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
			connectToDB();                             // lost due to either server restart, or a
		} else {                                       // connection idle timeout (the wait_timeout
			throw err;                                 // server variable configures this)
		}
	});

	app.set('sql', sql);
}

connectToDB(app);

/*
 * AUTH
 */
var crypto = require('crypto');
var sha = crypto.createHash('sha256');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
	function(username, password, done) {
		var sql = app.get('sql');
        sql.query('SELECT * FROM account WHERE username = ? AND password = ?', {username: username, password: sha.update(password).digest('hex')}, function(err, rows) {
			if (err) { return done(err); }

			if(rows.length > 0) {
				return done(null, rows[0]);
			}

			return done(null, false, { message: 'Invalid username or password.' });
		});
	}
));

app.set('passport', passport);

/*
 * SOMEBODY SET US UP THE BOMB
 */
var server = http.createServer(app).listen(app.get('port'), function () {
	require('socket.io').listen(server, { log: false });
	console.log('Express server listening on port ' + app.get('port'));
});
