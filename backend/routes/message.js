const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
const messageCtrl = require('../controllers/message');


router.post('/', auth, messageCtrl.createMessage);
router.put('/:id', auth, messageCtrl.modifyMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);
router.get('/', auth, messageCtrl.getAllMessages);
router.get('/:id', auth, messageCtrl.getOneMessage);

// Ajouter route like


module.exports = router;