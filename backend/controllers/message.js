const Message = require('../models/Message');

// exports.addLike = (req, res, next) => {
//     Message.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(message => {
//       const userId = req.body.userId;

//       switch (req.body.like) {
//         case 1 :
//             message.likes++; 
//             message.usersLiked.push(userId); 
//           break;
//         case 0: 
//           if ((message.usersLiked.includes(userId))){ 
//             message.likes--; 
//             message.usersLiked = message.usersLiked.filter(userLiked => userLiked !== userId); 
//           }
//           if ((message.usersDisliked.includes(userId))){ 
//             message.dislikes--; 
//             message.usersDisliked = message.usersDisliked.filter(userDisliked => userDisliked !== userId); 
//           }
//           break;
//         case -1 :
//             message.dislikes++; 
//             message.usersDisliked.push(userId); 
//         break;
//         default:
//             throw 'Invalid like';
//       }
//       Message.save()
//       .then(() => res.status(201).json({ message: 'Choix enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//     }
//       )
//     .catch(error => res.status(404).json({ error }));
// }

exports.createMessage = (req, res, next) => {
    Message.build({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId
    });
    Message.save()
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