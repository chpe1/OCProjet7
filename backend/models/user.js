const Sequelize = require('sequelize');
const sequelize = require('./../database');

const User = sequelize.define('user', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: Sequelize.STRING,
    avatar: Sequelize.STRING,
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: false
    }
});

module.exports = User;