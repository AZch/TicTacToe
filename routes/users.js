var FindQuestions = require('../dbData/findQuestions');
var Game = require('../shemas/game');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  Game.aggregate([
    { $match: { size: 15 } },
    { $group: {
        _id: "$size",
        count: { $sum: 1 }
      }
    },
  ], function (err, data) {
    res.send(data);
  });
});

module.exports = router;
