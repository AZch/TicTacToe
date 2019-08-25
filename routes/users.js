var FindQuestions = require('../dbData/findQuestions');
var Game = require('../shemas/game');
var express = require('express');
var router = express.Router();
const CreateQuestions = require('../dbData/createQuestions');

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
      if (err) res.send({error: 'Bad user id'});
      res.send(data);
  });
});

router.post('/', function (req, res, next) {
    const data = { name: req.body.username };
    if (data.name !== undefined &&
        data.name !== null &&
        data.name !== "") {
        CreateQuestions.addNewUser(data).then((user) => {
            res.send(user);
        }).catch((error) => {
            res.send({error: 'Bad user data'});
        });
    } else {
        res.send({error: 'Bad user data'});
    }
});

module.exports = router;
