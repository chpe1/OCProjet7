const User = require("../models/user");
const Message = require("../models/message");
const Comment = require("../models/comment");
const sequelize = require('./../database');

exports.getAllUsers = (req, res, next) => {
    User.findAll({
        attributes: ['id', 'email', 'password', 'avatar', 'isAdmin', [sequelize.fn('date_format', sequelize.col('user.createdAt'), '%d-%m-%Y à %H:%i:%s'), 'createdAt_formated'], [sequelize.fn('date_format', sequelize.col('user.updatedAt'), '%d-%m-%Y à %H:%i:%s'), 'updatedAt_formated']]
    })
    .then(users=> res.status(200).json(users))
    .catch(error => res.status(404).json({ error }));
};

// Retourne la liste des informations de l’utilisateur dont l’id est passé en paramètre ainsi que ses 5 derniers messages et ses 5 derniers commentaires
exports.getOneUser = (req, res, next) => {
    let objectResponse;
    User.findOne({
        attributes: ['id', 'email', 'password', 'avatar', 'isAdmin', [sequelize.fn('date_format', sequelize.col('user.createdAt'), '%d-%m-%Y à %H:%i:%s'), 'createdAt_formated'], [sequelize.fn('date_format', sequelize.col('user.updatedAt'), '%d-%m-%Y à %H:%i:%s'), 'updatedAt_formated']],
        where: { id: req.params.id }
    })
    .then(user=> {
        Message.findAll({
            attributes: ['id', 'content', 'userId', 'like', [sequelize.fn('date_format', sequelize.col('message.createdAt'), '%d-%m-%Y à %H:%i:%s'), 'createdAt_formated'], [sequelize.fn('date_format', sequelize.col('message.updatedAt'), '%d-%m-%Y à %H:%i:%s'), 'updatedAt_formated']],
            where: {
                userId: user.id
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5
        })
        .then(message => {
            Comment.findAll({
                attributes: ['id', 'content', 'userId', 'messageId', [sequelize.fn('date_format', sequelize.col('comment.createdAt'), '%d-%m-%Y à %H:%i:%s'), 'createdAt_formated'], [sequelize.fn('date_format', sequelize.col('comment.updatedAt'), '%d-%m-%Y à %H:%i:%s'), 'updatedAt_formated']],
                where: {
                    userId: user.id
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 5
            })
            .then(commentaires => {
                objectResponse = {
                    "id": user.id,
                    "email": user.email,
                    "password": user.password,
                    "avatar": user.avatar,
                    "isAdmin": user.isAdmin,
                    "createdAt": user.createdAt_formated,
                    "updatedAt": user.updatedAt_formated,
                    message,
                    commentaires
                }
                return res.status(200).json(objectResponse)
            })
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};

