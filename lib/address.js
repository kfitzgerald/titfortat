
var config = require('./../config');

module.exports = exports = Address;

function Address(app) {
    this.app = app;
    this.sql = app.get('sql');
}

Address.prototype.get = function (id, callback) {

    this.sql.query('SELECT * FROM `address` WHERE id = ?', [id], function (err, rows) {
        if (err) { callback && callback(err); }

        if (rows.length > 0) {
            callback && callback(null, rows[0]);
        } else {
            callback && callback(null, null);
        }

    });

};

Address.prototype.create = function(data, callback) {

    this.sql.query('INSERT INTO `address` SET ?', data, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Address.prototype.update = function(id, data, callback) {

    this.sql.query('UPDATE `address` SET ? WHERE ?', [ data, id], function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Address.prototype.remove = function(id, callback) {

    this.sql.query('DELETE FROM `address` WHERE ?', { id: id }, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};