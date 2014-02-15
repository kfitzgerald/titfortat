
module.exports = _sql  = {
    configure:function(app){

        /*
         * DATABASE
         */
        var mysql =require('mysql');


        sql = mysql.createConnection(mysql); // Recreate the connection, since
        // the old one cannot be reused.

        sql.connect(function (err) {                       // The server is either down
            if (err) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', err);
                setTimeout(function(){
                    _sql.configure(app);
                }, 2000);             // We introduce a delay before attempting to reconnect,
            }                                              // to avoid a hot loop, and to allow our node script to
        });                                                // process asynchronous requests in the meantime.
        // If you're also serving http, display a 503 error.
        sql.on('error', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                _sql.configure(app);                           // lost due to either server restart, or a
            } else {                                       // connection idle timeout (the wait_timeout
                throw err;                                 // server variable configures this)
            }
        });

        app.set('sql', sql);



    }
}