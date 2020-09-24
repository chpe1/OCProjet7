const jwt = require('jsonwebtoken');
const Comment = require('../models/comment');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    Comment.findOne({
        attributes: ['userId'],
        where: {
            id: req.params.id
        }
    })
    .then((comment) => {
        if (comment.userId != userId){
            throw 'Vous n\'êtes pas le rédacteur de ce commentaire !';
        }
        else {
            next();
        }
    })
    .catch(() => res.status(401).json({ message : 'Vous n\'êtes pas le rédacteur de ce commentaire !'}));
}
catch {
    res.status(401).json({error: 'Veuillez vous authentifier !'});
  }
};