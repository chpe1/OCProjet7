const Like = require('../models/like');
const { Sequelize } = require('sequelize');

exports.getLike = (req, res, next) => {
    Like.findAll({
        where: {
            userId: req.params.userId
        }
      })
    .then(likes=> {
      const tab= [];
      likes.forEach(like=> {
        tab.push(like.messageId);
      });
      res.status(200).json(tab)
    })
    .catch(error => res.status(404).json({ error }));
};