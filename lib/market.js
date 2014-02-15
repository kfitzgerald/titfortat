
var config = require('./../config'),
    DB = require('./db'),
    events = require('events'),
    util = require('util');

module.exports = exports = Market;

function Market(app) {

    events.EventEmitter.call(this);

    this._app = app;
    this._db = DB(app);
}

util.inherits(Market, events.EventEmitter);


Market.prototype.run = function() {

    // Create an order

    this._db.order.create({
        account_id: 1,
        type: 'BUY',
        have_type: 'bitcoin',
        want_type: 'titcoin',
        status: this._db.Order.Status.Open,
        amount: 1234.00000056,
        rate: 1
    }, function(err, result) {

        console.log('CREATE RESPONSE WAS', err, result);

    });

};
