const Sequelize = require('sequelize');
const helper = require('./helper/helper');

const User = helper().define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false, // 不能为空
        unique: true //唯一性
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false, // 不能为空
    },
    age: {
        type: Sequelize.INTEGER
    }

});
User.sync();
module.exports = User