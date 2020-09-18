const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Message = require('./message');

const Commentaire = sequelize.define('commentaire', {
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

Commentaire.belongsTo(User, {foreignKey: 'userId'});
// Commentaire.belongsTo(Message, {foreignKey: 'messageId'});


module.exports = Commentaire;