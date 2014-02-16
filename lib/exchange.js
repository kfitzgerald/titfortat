
var config = require('./../config');

module.exports = exports = Exchange;

function Exchange(app) {
    this.app = app;
    this.sql = app.get('sql');
}

Exchange.Exchanges = {
    TIT_TAT: 1,
    TIT_DOGE: 2,
    TAT_DOGE: 3,
    TIT_BTC: 4,
    TAT_BTC: 5
};

Exchange.prototype.get = function (id, callback) {

    this.sql.query('SELECT * FROM `exchange` WHERE id = ?', [id], function (err, rows) {
        if (err) { callback && callback(err); }

        if (rows.length > 0) {
            callback && callback(null, rows[0]);
        } else {
            callback && callback(null, null);
        }

    });

};

Exchange.prototype.create = function(data, callback) {

    this.sql.query('INSERT INTO `exchange` SET ?', data, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Exchange.prototype.update = function(id, data, callback) {

    this.sql.query('UPDATE `exchange` SET ? WHERE ?', [ data, { id: id }], function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};

Exchange.prototype.remove = function(id, callback) {

    this.sql.query('DELETE FROM `exchange` WHERE ?', { id: id }, function (err, res) {
        if (err) { callback && callback(err); }
        callback && callback(null, res);
    });

};