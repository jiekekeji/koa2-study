const Sequelize = require('sequelize');
const config = require('./config');

let helper = null;
function getIn() {
    if (helper === null) {
        helper = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
    }
    return helper;
}

module.exports = getIn