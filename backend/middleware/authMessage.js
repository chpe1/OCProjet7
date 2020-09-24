const jwt = require('jsonwebtoken');
const Message = require('../models/message');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    Message.findOne({
        attributes: ['userId'],
        where: {
            id: req.params.id
        }
    })
    .then((message) => {
        if (message.userId != userId){
            throw 'Vous n\'êtes pas le rédacteur du message !';
        }
        else {
            next();
        }
    })
    .catch(() => res.status(401).json({ message : 'Vous n\'êtes pas le rédacteur du message !'}));
}
catch {
    res.status(401).json({error: 'Veuillez vous authentifier !'});
  }
};