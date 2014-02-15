
/*
 * GET home page.
 */
exports.configure = function(app){
    app.get('/', function(req, res){
        res.render('index', {
            message : "Hello World"
        });
    });

    app.get('/account', function(req, res) {
        res.render('account', {
            message : 'Account!'
        })
    });

    app.get('/register', function(req, res) {
        res.render('register');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    })
};