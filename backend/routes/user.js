const express = require('express');

const router = express.Router();

const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');
const authUser = require('../middleware/authUser');


// Tout le monde peut s'inscrire en téléchargeant une image
router.post('/signup', multer, userCtrl.signup);
// Un utilisateur peut modifier son profil
router.put('/:id', authUser, multer, userCtrl.modifyUser);
// Un utilisateur peut supprimer son profil
router.delete('/:id', authUser, userCtrl.deleteUser);
// Tout le monde peut se loguer s'il est inscrit
router.post('/login', userCtrl.login);


module.exports = router;