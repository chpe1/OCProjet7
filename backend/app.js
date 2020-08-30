const express = require('express');
const bodyParser = require('body-parser');
 // Donne accès au chemin du système de fichier
const path = require('path'); 

const app = express();

const sequelize = require('./database');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentsRoutes = require('./routes/commentaires');
const adminRoutes = require('./routes/admin');

// Crée les tables si elles n'existent pas déjà selon les formats contenus dans models
sequelize.sync();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/messages', messageRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/admin', adminRoutes);



module.exports = app;