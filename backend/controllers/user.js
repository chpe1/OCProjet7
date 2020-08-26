const bcrypt= require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = User.build({
            email: req.body.email,
            password: hash,
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // req.body.avatar avec postman
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
        
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    let userObject;
      if (req.file){
        userObject = {
          ...JSON.parse(req.body.user),
        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    }
    else{
      userObject = {...req.body}
    }
    User.update(userObject, {
        where: {
            id: req.params.id
        }
    })
    .then(nbrUserUpdate => res.status(200).json(nbrUserUpdate))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(user => {
        const filename = user.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            User.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé avec succès !' }))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};