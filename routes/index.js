
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
}