
var config = require('./../config');

module.exports = exports = Account;

function Account(app) {
    this.app = app;
    this.sql = app.get('sql');
}

Account.prototype.get = function (id, callback) {

    this.sql.query('SELECT * FROM `account` WHERE id = ?', [id], function (err, rows) {
        if (err) { callback && callback(err); }

        if (rows.length > 0) {
            callback && callback(null, rows[0]);
        } else {
            callback && callback(null, null);
        }

    });

};

Account.prototype.create = function(data, callback) {

    this.sql.query('INSERT INTO `account` SET ?', data, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Account.prototype.update = function(id, data, callback) {

    this.sql.query('UPDATE `account` SET ? WHERE ?', [ data, { id: id }], function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Account.prototype.remove = function(id, callback) {

    this.sql.query('DELETE FROM `account` WHERE ?', { id: id }, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};