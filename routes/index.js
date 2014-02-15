
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

    app.get('/test', function(req, res) {
        var Market = require('./../lib/market'),
            market = new Market(app);

        market.run();

//        // CREATE TEST
//        order.create({
//            account_id: 1,
//            type: 'BUY',
//            have_type: 'bitcoin',
//            want_type: 'titcoin',
//            status: Order.Status.Open,
//            amount: 1234.00000056,
//            rate: 1
//        }, function(err, result) {
//
//            console.log('CREATE RESPONSE WAS', err, result);
//
//        });

//        // GET AND UPDATE TEST
//        order.get(1, function(err, data) {
//            console.log('I CAN HAZ ORDER?', data);
//
//            order.update(data.id, {
//                amount: data.amount + 1
//            }, function(err, result){
//                console.log('UPDATE WAS', result);
//            })
//        });

//        // DELETE TEST
//        order.remove(2, function(err, result) {
//
//            console.log('DELETE WAS', result);
//
//        });

    });
};