const bcrypt= require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res, next) => {
    let avatarFile;
    if (req.file)
    {
        avatarFile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    else{
        avatarFile = `${req.protocol}://${req.get('host')}/images/avatar_default.png`;
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
            email: req.body.email,
            password: hash,
            avatar: avatarFile
        })
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
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user =>{
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) { // Si le mdp est différent, on le modifie
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        // Si la requête contient un fichier
                        if (req.file){
                            User.update({
                                password: hash,
                                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                            }, 
                            {
                                where: {
                                    email: req.body.email
                                }
                            })
                            .then(nbrUserUpdate => res.status(200).json(nbrUserUpdate))
                            .catch(error => res.status(400).json({ error }));
                        }
                        // Si la requête ne contient pas de fichier
                        else{
                            User.update({
                                password: hash,
                                avatar: req.body.avatar
                            }, 
                            {
                                where: {
                                    email: req.body.email
                                }
                            })
                            .then(nbrUserUpdate => res.status(200).json(nbrUserUpdate))
                            .catch(error => res.status(400).json({ error }));
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
                }
                // Si le mdp est le même, on modifie juste l'avatar
                else{
                    User.update({
                        avatar: req.body.avatar
                    }, 
                    {
                        where: {
                            email: req.body.email
                        }
                    })
                    .then(nbrUserUpdate => res.status(200).json(nbrUserUpdate))
                    .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        const filename = user.avatar.split('/images/')[1];
        if (filename !== 'avatar_default.png'){
                fs.unlink(`images/${filename}`, (err) => {
                    console.log('avatar supprimé avec succès');
            });
        }
        User.destroy({
            where: {
                email: req.body.email
            }
        })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé avec succès !' }))
        .catch(error => res.status(400).json({ error }));
        
    })
    .catch(error => res.status(500).json({ error }));
};