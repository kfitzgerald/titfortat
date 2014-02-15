/*
 * Authentication pages.
 */
exports.configure = function (app) {
	app.get('/register', function (req, res) {
		res.render('register', { title: 'Register' });
	});

	app.post('/register', function (req, res) {
		sql.query('SELECT id FROM account WHERE username = ?', [req.body.username], function (err, rows) {
			if (err) throw err;

			if (rows.length > 0) {
				console.log('TODO User Already Exists error');
			} else {
				sql.query('INSERT INTO account ?', {username: req.body.username, password: sha.update(req.body.password).digest('hex')}, function (err) {
					if (err) throw err;

					console.log('TODO Successful Register');
				});
			}
		});
	});

	app.post('/login', function(req, res) {
		passport.authenticate('local', { successRedirect: '/',
			failureRedirect: '/auth',
			failureFlash: true });
	});
}