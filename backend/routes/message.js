const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
const messageCtrl = require('../controllers/message');


// Un utilisateur peut créer un message
router.post('/', auth, messageCtrl.createMessage);
// Un utilisateur peut modifier son message
router.put('/:id', auth, messageCtrl.modifyMessage);
// Un utilisateur peut supprimer son message
router.delete('/:id', auth, messageCtrl.deleteMessage);
// Un utilisateur peut voir tous les messages
router.get('/', auth, messageCtrl.getAllMessages);
// Un utilisateur peut obtenir un message
router.get('/:id', auth, messageCtrl.getOneMessage);
// Un utilisateur peut liker un message
router.post('/like/:messageId', auth, messageCtrl.addLike);


module.exports = router;