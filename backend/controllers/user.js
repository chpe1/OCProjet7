const bcrypt= require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
            email: req.body.email,
            password: hash,
            // avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
            avatar: req.body.avatar
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
        // On cré un objet utilisateur pour faire une copie modifiée de user
        let userObject;
        // Si la requête dispose d'une image, on copie les infos de la requête 
        // dans l'objet utilisateur et on y ajoute cet avatar
        if (req.file){
            userObject = {
                ...JSON.parse(user),
                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) { // Si le mdp est différent, on le modifie
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        userObject.password = hash
                    })
                    .catch(error => res.status(500).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
        }
        // Si la requête ne contient pas d'image on copie juste les infos de l'user contenu dans la requête
        //  dans l'objet utilisateur
        else{
            userObject = {
                email : user.email,
                password: user.password,
                avatar : user.avatar
            };
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) { // Si le mdp est différent, on le modifie
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        userObject.password = hash;
                    })
                    .catch(error => res.status(500).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
        }
        console.log(userObject);
        User.update(userObject, {
            where: {
                email: req.body.email
            }
        })
        .then(nbrUserUpdate => res.status(200).json(nbrUserUpdate))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    
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