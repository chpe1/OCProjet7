const Commentaire = require('../models/Commentaires');

exports.createComment = (req, res, next) => {
    Commentaire.create({
        content: req.body.content,
        userId: req.body.userId,
        messageId: req.params.messageId
    })
    .then((comment) => res.status(201).json({ comment }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    Commentaire.update(req.body, {
        where: {
            id: req.params.id
        }
    })  
    .then(() => res.status(200).json({ message: 'Commentaire modifié avec succès !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Commentaire.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Commentaire.findAll({
        where: {
            messageId: req.params.messageId
        }
    })
    .then(commentaires => res.status(200).json(commentaires))
    .catch(error => res.status(400).json({ error }));
};