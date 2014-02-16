
module.exports = {
    configure:function(app){
	    console.log('passport.js configure');

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
                return sql.query('SELECT * FROM account WHERE username = ? AND password = ?', {username: username, password: sha.update(password).digest('hex')}, function(err, rows) {
                    if (err) { return done(err); }

                    if(rows.length > 0) {
	                    var user = rows[0];

	                    return sql.query('SELECT * FROM address WHERE account_id = ?', [rows[0].id], function(err, rows) {
		                    if (err) throw err;

		                    user.addresses = rows;

		                    console.log('TODO Successful Auth');

		                    return done(null, user);
	                    });
                    } else {
	                    return done(null, false, { message: 'Invalid username or password.' });
                    }
                });
            }
        ));

	    app.use(passport.initialize());
	    app.use(passport.session());
        app.set('passport', passport);

	    console.log('passport wat');
    }
}