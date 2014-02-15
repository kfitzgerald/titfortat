/*
 * Authentication pages.
 */

var crypto = require('crypto'),
    sha = crypto.createHash('sha256'),
    BitCli = require('./../lib/cli');

exports.configure = function (app) {
    var sql = app.get('sql');
    console.log('SQL IS', sql);
	app.get('/register', function (req, res) {
		res.render('register', { title: 'Register' });
	});

	app.post('/register', function (req, res) {
        sql.query('SELECT id FROM account WHERE username = ?', [req.body.username], function (err, rows) {
			if (err) throw err;

			if (rows.length > 0) {
				console.log('TODO User Already Exists error');
			} else {
                // console.log(req, req.body);
                sql.query('INSERT INTO account SET ?', { username: req.body.username, password: sha.update(req.body.password).digest('hex') }, function (err, result) {
					if (err) throw err;

                    var newAccountId = result.insertId;

                    var cli = new BitCli(app.get('config'));
                    cli.generateNewAddressSet(function(err, addresses) {

                        /* { titcoin: 'tFDwzanzueEY6huHh8SsKCWCAyXqiADc6A',
                         tatcoin: 'TQcWvBWDgJgjZ7cu9GY1tX9a4quDNi4nAo',
                         bitcoin: '1LmS9jMdB1sCnuP5yXaHxwcy4rFdgZZzCe' } */

                        var values = [];

                        for (var i in addresses) {
                            if (addresses.hasOwnProperty(i)) {
                                values.push([ newAccountId, i, addresses[i] ])
                            }
                        }


                        sql.query('INSERT INTO address (account_id, type, hash) VALUES ?', [values], function(err) {
                            if (err) throw err;

	                        sql.query('SELECT * FROM account WHERE id = ?', [newAccountId], function(err, rows) {
		                        if (err) throw err;

		                        var user = rows[0];

		                        sql.query('SELECT * FROM address WHERE account_id = ?', [newAccountId], function(err, rows) {
			                        if (err) throw err;

			                        user.addresses = rows;

			                        var passport = app.get('passport');
			                        passport.login(user);

			                        console.log('TODO Successful Register');
		                        });
	                        });
                        });
                    });
				});
			}
		});
	});

	app.post('/login', function(req, res) {
		var passport = app.get('passport');
        passport.authenticate('local', { successRedirect: '/account',
			failureRedirect: '/login',
			failureFlash: true });
	});
};