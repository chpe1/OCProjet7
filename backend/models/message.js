const Sequelize = require('sequelize');
const sequelize = require('./../database');

const Message = sequelize.define('message', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    like: Sequelize.TINYINT
});

// GERER LE USERLIKES OU USERDISLIKES

module.exports = Message;