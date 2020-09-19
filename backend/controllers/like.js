const Like = require('../models/like');
const { Sequelize } = require('sequelize');

exports.getLike = (req, res, next) => {
    Like.findOne({
        where: {
          [Sequelize.and]: [
            { userId: req.body.userId },
            { messageId: req.body.messageId }
          ]
        }
      })
    .then(like=> res.status(200).json(like))
    .catch(error => res.status(404).json({ error }));
};