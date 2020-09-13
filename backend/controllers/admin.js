const User = require("../models/user");
const Message = require("../models/message");
const Commentaire = require("../models/commentaires");

exports.getAllUsers = (req, res, next) => {
    console.log('flag')
    User.findAll()
    .then(users=> res.status(200).json(users))
    .catch(error => res.status(404).json({ error }));
};

// Retourne la liste des informations de l’utilisateur dont l’id est passé en paramètre ainsi que ses 5 derniers messages et ses 5 derniers commentaires
exports.getOneUser = (req, res, next) => {
    let objectResponse;
    User.findOne({ 
        where: { id: req.params.id }
    })
    .then(user=> {
        Message.findAll({
            where: {
                userId: user.id
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5
        })
        .then(message => {
            Commentaire.findAll({
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
                    "createdAt": user.createdAt,
                    "updatedAt": user.updatedAt,
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

