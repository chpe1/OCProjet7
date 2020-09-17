const Sequelize = require('sequelize');
const sequelize = require('./../database');
const Commentaire = require('./commentaires');
const User = require('./user');
const Like = require('./like');

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
    like: Sequelize.TINYINT.UNSIGNED
});

Message.hasMany(Commentaire, {as: 'reactors'});
Message.hasMany(Like, {as: 'likers'});
Message.belongsTo(User, {foreignKey: 'userId'});  // On delete cascade à rajouter à chaque endroit où il y a une clé étrangère

module.exports = Message;