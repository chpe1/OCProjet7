const Message = require('../models/message');
const Like = require('../models/like');
const User = require('../models/user');
const fs = require('fs');
// const { Sequelize } = require('sequelize');

exports.createMessage = (req, res, next) => {
    let imageFile;
    if (req.file)
    {
        imageFile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    else{
        imageFile = '';
    }
    Message.create({
        content: req.body.content,
        userId: req.body.userId,
        like: 0,
        image: imageFile
    })
    .then((message) => res.status(201).json({ message }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
    console.log('flag');
    let imageFile;
    if (req.file)
    {
        imageFile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    else{
        imageFile= req.body.image;
    }
    Message.update({
        content: req.body.content,
        image: imageFile
    }, {
        where: {
            id: req.params.id
        }
    })  
    .then(() => res.status(200).json({ message : 'Message modifié avec succès !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
    Message.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(message => {
        if (message.image != ''){
            const filename = message.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                console.log(err);
            })  
        }        
        Message.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({ message: 'Message supprimé avec succès !' }))
        .catch(error => res.status(400).json({ error }));
    })
};

exports.getOneMessage = (req, res, next) => {
    Message.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(message=> res.status(200).json(message))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllMessages = (req, res, next) => {
    Message.findAll({
        // attributes: ['id', 'content', 'userId', 'like', 'createdAt', 'updatedAt'],
        order: [
            ['createdAt', 'DESC']
        ],
        include: {
            model: User,
            attributes: ['email', 'avatar']
        }
    })
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
};

exports.addLike = (req, res, next) => {
    // Quand l'utilisateur clique sur j'aime,
    // la requête part avec req.body.like à 1 s'il n'aimait pas déjà, à 0 si c'est pour enlever son like
   
    if (req.body.like === 1){
            Message.increment({
                like: 1
            },{
                where: {
                    id: req.params.messageId
                }
            })
            .then(() => res.status(200).json({ message: 'Un utilisateur de plus aime ce message !'}))
            .catch(error => res.status(400).json({ error }));
        
        // ajouter une ligne à la table like avec le userId et le messageId
        Like.create({
            messageId: req.params.messageId,
            userId: req.body.userId
        })
        .then(() => res.status(201).json({ message: 'UserId a été ajouté à la liste des users qui aime ce message' }))
        .catch(error => res.status(400).json({ error }));
    }
    else if (req.body.like === 0){
        // On enlève un like à la table message
        Message.decrement({
            like: 1
        },{
            where: {
                id: req.params.messageId
            }
        })
        .then(() => {
            Like.destroy({
                where: {
                    userId: req.body.userId,
                    messageId: req.params.messageId              
                }    
            })
            .then(() => res.status(201).json({ message: 'UserId a été retiré de la liste des users qui aime ce message'}))
            .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));        
    }
    else{
        throw new Error ('Le like doit être de 1 ou 0');
    }
}