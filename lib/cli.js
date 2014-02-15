
var config = require('../config'),
    util = require('util'),
    exec = require('child_process').exec;

module.exports = exports = BitCli;

function BitCli(cfg) {
    this.config = cfg || config;
}

BitCli.prototype.generateNewAddressSet = function(callback) {

    var self = this,
        addressSet = {};

    var i = 0;
    function reqCall(i) {
        // We done?
        if (i >= self.config.cli.length) {
            callback && callback(null, addressSet);
        } else {

            // Make the CLI call to generate a new address
            var c = self.config.cli[i],
                cmd = util.format("%s getnewaddress", c.cmd);

            // Execute it
            exec(cmd, function(err, stdout, stderr) {

                // ERRORED?
                if (err && err.code != 1) {
                    // FAILED
                    // Skip it for now
                    console.error('Error creating address', c.name, err);
                    reqCall(i+1);
                } else {

                    // Check the response
                    //console.log('out', stdout, stdout.trim().length, 'err', stderr);
                    if (stdout.trim().length == 34) {
                        // SUCCESS
                        addressSet[c.name] = stdout.trim();
                    } else {
                        // WOMP WOMP
                        console.error('Got something unexpected back from address generator', stdout, 'err', stderr);
                    }

                    reqCall(i+1);
                }

            });
        }
    }
    reqCall(i);

};
