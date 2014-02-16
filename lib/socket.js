
var config = require('./../config'),
    DB = require('./db'),
    events = require('events'),
    util = require('util');

module.exports = _this = {
    configure:function(app, server){
        _this._db = DB(app);

        var io = require('socket.io').listen(server, { log: false });
        io.sockets.on('connection', function (socket) {
            socket.emit('news', { hello: 'world' });
            socket.on('db', function (data) {
                if(!_this._db[data['model']] || !_this._db[data['model']][data['action']]){
                    throw new Error('Ivalid reques');
                }
                _this._db[data['model']][data['action']](data.data, function(err, result) {
                    if(err){ throw err}
                    console.log(result);
                    socket.emit(data['model'] + '.' + data['action'], result);

                });
            });
        });
    }
}
//  -  /Macintosh HD/Library/Desktop Pictures