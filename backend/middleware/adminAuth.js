const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    User.findOne({
      attributes: ['isAdmin'],
      where: {
        id: userId
        }
      })
    .then((user) => {
      if (!user.isAdmin){
        res.status(403)
          return res.send('Interdit')
      }else{
        next()
      }
    })
    .catch(error => res.status(401).json({ error }));
  }
  catch {
    res.status(401).json({
      error: new Error('Requête non-authentifiée !')
    });
  }
}