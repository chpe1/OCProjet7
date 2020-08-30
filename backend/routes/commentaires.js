const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
const commentsCtrl = require('../controllers/commentaires');


// Un utilisateur peut créer un commentaire
router.post('/:messageId', auth, commentsCtrl.createComment);
// Un utilisateur peut modifier son commentaire
router.put('/:id', auth, commentsCtrl.modifyComment);
// Un utilisateur peut supprimer son commentaire
router.delete('/:id', auth, commentsCtrl.deleteComment);
// Un utilisateur peut obtenir la liste de tous les commentaires liés à un message.
router.get('/:messageId', auth, commentsCtrl.getAllComments);


module.exports = router;