const Comment = require('../models/Comment');
const User = require('../models/User');
const sequelize = require('./../database');

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
        attributes: ['id', 'content', 'userId', 'messageId', [sequelize.fn('date_format', sequelize.col('comment.createdAt'), '%d-%m-%Y à %H:%i:%s'), 'createdAt_formated'], [sequelize.fn('date_format', sequelize.col('comment.updatedAt'), '%d-%m-%Y à %H:%i:%s'), 'updatedAt_formated']],
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