const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Message = require('./message');

const Comment = sequelize.define('comment', {
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
    messageId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Comment.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});

User.hasMany(Comment);

Comment.belongsTo(Message, {
    constraints: true,
    onDelete: 'CASCADE'
});

Message.hasMany(Comment);

module.exports = Comment;