
var config = require('./../config');

module.exports = exports = Transaction;

function Transaction(app) {
    this.app = app;
    this.sql = app.get('sql');
}

Transaction.prototype.get = function (id, callback) {

    this.sql.query('SELECT * FROM `transaction` WHERE id = ?', [id], function (err, rows) {
        if (err) { callback && callback(err); }

        if (rows.length > 0) {
            callback && callback(null, rows[0]);
        } else {
            callback && callback(null, null);
        }

    });

};

Transaction.prototype.create = function(data, callback) {

    this.sql.query('INSERT INTO `transaction` SET ?', data, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Transaction.prototype.update = function(id, data, callback) {

    this.sql.query('UPDATE `transaction` SET ? WHERE ?', [ data, id], function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Transaction.prototype.remove = function(id, callback) {

    this.sql.query('DELETE FROM `transaction` WHERE ?', { id: id }, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};