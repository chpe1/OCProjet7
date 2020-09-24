const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if (req.params.id != userId){
        throw 'Vous n\'êtes pas le propriétaire de ce compte !';
    }
    else {
        next();
    }
}
catch {
    res.status(401).json({error: 'Erreur d\'authentification !'});
  }
};