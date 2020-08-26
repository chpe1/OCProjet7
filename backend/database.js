const Sequelize = require('sequelize');

const sequelize = new Sequelize('P7', 'root', '', { 
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;