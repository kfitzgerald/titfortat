
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

    // PLAN
    // for each exchange
    // find active buy orders in order of highest-offer, then by placed
    // find active sell orders in order of lowest-offer, then by placed
    // for each buy order, see if there is a sell order asking <= t

};
