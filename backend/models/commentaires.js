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
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    messageId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Commentaire;