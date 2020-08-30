const express = require('express');

const router = express.Router();

const adminAuth = require('../middleware/adminAuth');
// const multer = require('../middleware/multer-config');
const adminCtrl = require('../controllers/admin');
const commentsCtrl = require('../controllers/commentaires');
const messageCtrl = require('../controllers/message');

// Un admin peut obtenir tous les commentaires liés à un message
router.get('/comments/:messageId', adminAuth, commentsCtrl.getAllComments); 
// Un admin peut obtenir tous les messages
router.get('/messages/', adminAuth, messageCtrl.getAllMessages);
// Un admin peut modifier un commentaire
router.put('/comments/:id', adminAuth, commentsCtrl.modifyComment);
// Un admin peut modifier un message
router.put('/messages/:id', adminAuth, messageCtrl.modifyMessage);
// Un admin peut supprimer un commentaire
router.delete('/comments/:id', adminAuth, commentsCtrl.deleteComment);
// Un admin peut supprimer un message
router.delete('/messages/:id', adminAuth, messageCtrl.deleteMessage);
// Un admin peut obtenir la liste de tous les utilisateurs
router.get('/users', adminAuth, adminCtrl.getAllUsers);
// Un admin peut obtenir les infos sur un utilisateur avec ces 5 derniers messages et ses 5 derniers commentaires
router.get('/users/:id', adminAuth, adminCtrl.getOneUser)

module.exports = router;