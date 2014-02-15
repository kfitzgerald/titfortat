
module.exports = exports = {

    /**
     * Redis connection info
     */
    redis: {
        port: 6379,
        host: '127.0.0.1'
        //auth: ''
    },

    /**
     * MySQL Connection info
     */
    mysql: {
        host: '127.0.0.1',
        user: 'titfortat',
        password: 'your_password_here',
	    database: 'titfortat'
    },

    /**
     * CLI Paths
     */
    cli: [
        { name: 'titcoin',  cmd: '/opt/titcoin/bin/bitcoin-cli' },
        { name: 'tatcoin',  cmd: '/opt/tatcoin/bin/bitcoin-cli' },
        { name: 'dogecoin', cmd: '/opt/bitcoin/bin/bitcoin-cli -conf=dogecoin.conf -datadir=/home/_your_username_/.dogecoin' },
        { name: 'bitcoin',  cmd: '/opt/bitcoin/bin/bitcoin-cli' }
    ]

};
