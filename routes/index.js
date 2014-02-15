
/*
 * GET home page.
 */
exports.configure = function(app){
    app.all('/', function(req, res){
      res.render('index', { title: 'Express' });
    });
    app.all('/my_ass', function(req, res){
        res.send('your face');
    });
    app.all('/account', function(req, res){
        res.render('account', { });
    });
    app.get('/register', function(req, res) {
        res.render('register');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

	require('./auth').configure(app);
};