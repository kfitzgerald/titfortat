
var config = require('./../config');

module.exports = exports = Order;

function Order(app) {
    this.app = app;
    this.sql = app.get('sql');
}

Order.Status = {
    Open: 1,
    Closed: 2
};

Order.prototype.get = function (id, callback) {

    this.sql.query('SELECT * FROM `order` WHERE id = ?', [id], function (err, rows) {
        if (err) { callback && callback(err); }

        if (rows.length > 0) {
            callback && callback(null, rows[0]);
        } else {
            callback && callback(null, null);
        }

    });

};

Order.prototype.create = function(data, callback) {

    this.sql.query('INSERT INTO `order` SET ?', data, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Order.prototype.update = function(id, data, callback) {

    this.sql.query('UPDATE `order` SET ? WHERE ?', [ data, { id: id }], function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Order.prototype.remove = function(id, callback) {

    this.sql.query('DELETE FROM `order` WHERE ?', { id: id }, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};




Order.prototype.findActiveBuyOrdersForExchange = function (exchange_id, callback) {

    this.sql.query('SELECT * FROM `order` WHERE ? ORDER BY rate DESC, created ASC', [{
        exchange_id: exchange_id,
        type: 'BUY',
        status: Order.Status.Open
    }], function (err, rows) {
        if (err) { callback && callback(err); }

        callback && callback(null, rows);

    });

};

Order.prototype.findActiveSellOrdersForExchange = function (exchange_id, callback) {

    this.sql.query('SELECT * FROM `order` WHERE ? ORDER BY rate ASC, created ASC', [{
        exchange_id: exchange_id,
        type: 'SELL',
        status: Order.Status.Open
    }], function (err, rows) {
        if (err) { callback && callback(err); }

        callback && callback(null, rows);

    });

};