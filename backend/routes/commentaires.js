const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
const commentsCtrl = require('../controllers/commentaires');
const authComment = require('../middleware/authComment');


// Un utilisateur peut créer un commentaire
router.post('/:messageId', auth, commentsCtrl.createComment);
// Seul le créateur du commentaire peut le modifier
router.put('/:id', authComment, commentsCtrl.modifyComment);
// Seul le créateur du commentaire peut le supprimer
router.delete('/:id', authComment, commentsCtrl.deleteComment);
// Un utilisateur peut obtenir la liste de tous les commentaires liés à un message.
router.get('/:messageId', auth, commentsCtrl.getAllComments);


module.exports = router;