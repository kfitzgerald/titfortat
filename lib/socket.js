module.exports = {
    configure:function(app, server){

        var io = require('socket.io').listen(server, { log: false });
        io.sockets.on('connection', function (socket) {
            socket.emit('news', { hello: 'world' });
            socket.on('my other event', function (data) {
                console.log(data);
            });
        });
    }
}