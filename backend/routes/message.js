const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
const messageCtrl = require('../controllers/message');


router.post('/', messageCtrl.createMessage);
router.put('/:id', auth, messageCtrl.modifyMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);
router.get('/', messageCtrl.getAllMessages);
router.post('/:id', messageCtrl.getOneMessage);

// Ajouter route like


module.exports = router;