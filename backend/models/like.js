const Sequelize = require('sequelize');
const sequelize = require('./../database');

const Like = sequelize.define('like', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: Sequelize.TINYINT,
    userId: Sequelize.INTEGER,
    messageId: Sequelize.INTEGER
});

// GERER LE USERLIKES OU USERDISLIKES

module.exports = Like;