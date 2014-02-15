var config = require('./../config'),
    BitCli = require('./../lib/cli');

var cli = new BitCli(config);
cli.generateNewAddressSet(function(err, addresses) {
    console.log('GOT ADDRESSES', err, addresses);
});