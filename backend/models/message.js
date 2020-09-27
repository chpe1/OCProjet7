const Sequelize = require('sequelize');
const sequelize = require('./../database');
const User = require('./user');

const Message = sequelize.define('message', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    like: Sequelize.TINYINT.UNSIGNED,
    image: Sequelize.STRING
});

Message.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});

User.hasMany(Message);


module.exports = Message;