const Sequelize = require('sequelize');
const sequelize = require('./../database');
const Commentaire = require('./commentaire');
const User = require('./user');
const Like = require('./like');

const Message = sequelize.define('message', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    like: Sequelize.TINYINT
});

Message.hasMany(Commentaire, {as: 'reactors'});
Message.hasMany(Like, {as: 'likers'});
Message.belongsTo(User, {foreignKey: 'userId'});

// GERER LE USERLIKES OU USERDISLIKES

module.exports = Message;