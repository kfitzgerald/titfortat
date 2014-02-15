
module.exports = {
    configure:function(app){
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
    }
}