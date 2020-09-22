const Sequelize = require('sequelize');
const sequelize = require('./../database');
const User = require('./user');
const Message = require('./message');

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

User.belongsToMany(Message, { through: Like }); 
Message.belongsToMany(User, { through: Like });  // Un message peut appartenir à plusieurs utilisateurs à travers un like