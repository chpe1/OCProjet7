const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');


router.post('/signup', multer, userCtrl.signup);
router.put('/', auth, multer, userCtrl.modifyUser);
router.delete('/', auth, userCtrl.deleteUser);
router.post('/login', userCtrl.login);


module.exports = router;