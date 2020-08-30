const Sequelize = require('sequelize');
const sequelize = require('./../database');

const Like = sequelize.define('like', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    messageId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    indexes: [
    // crée un index unique sur userId et messageId
    {
      unique: true,
      fields: ['userId', 'messageId']
    }]
});

module.exports = Like;