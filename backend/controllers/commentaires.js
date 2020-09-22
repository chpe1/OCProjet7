const Comment = require('../models/Comment');
const User = require('../models/User');

exports.createComment = (req, res, next) => {
    Comment.create({
        content: req.body.content,
        userId: req.body.userId,
        messageId: req.params.messageId
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé avec succès !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })  
    .then(() => res.status(200).json({ message: 'Commentaire modifié avec succès !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        where: {
            messageId: req.params.messageId
        },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['email', 'id', 'avatar']
        }]
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};