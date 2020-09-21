const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const likeCtrl = require('../controllers/like');

// Route pour savoir si un utilisateur a liké
router.get('/:userId', auth, likeCtrl.getLike);

module.exports = router;