const Sequelize = require('sequelize');
const sequelize = require('../database');

const Commentaire = sequelize.define('commentaire', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    messageId: Sequelize.INTEGER
});

// GERER LE USERLIKES OU USERDISLIKES

module.exports = Commentaire;