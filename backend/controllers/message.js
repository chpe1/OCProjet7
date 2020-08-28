const Message = require('../models/Message');

exports.createMessage = (req, res, next) => {
    Message.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        like: 0
    })
    .then((message) => res.status(201).json({ message }))
    .catch(error => res.status(400).json({ error }));
  };

  exports.modifyMessage = (req, res, next) => {
    Message.update(req.body, {
        where: {
            id: req.params.id
        }
    })  
  .then(nbrMessageUpdate => res.status(200).json(nbrMessageUpdate))
  .catch(error => res.status(400).json({ error }));
  };

  exports.deleteMessage = (req, res, next) => {
    Message.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Message supprimé avec succès !' }))
    .catch(error => res.status(400).json({ error }));
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
    Message.findAll()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
      };