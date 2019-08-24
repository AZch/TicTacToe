var User = require('../shemas/user');
var FindQuestion = require('../dbData/findQuestions');
var CreateQuestions = require('../dbData/createQuestions');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.aggregate([
    { $match: {} }
  ], function (err, users) {
    if(err) return console.log(err);
    res.send(200, users);
  });
});

router.post('/', function (req, res, next) {
  const username = req.body.username;
  FindQuestion.getUserByName(username).then( (user) => {
    let dataGame = { size: req.body.sizeGame, sizeWin: req.body.countWin };

    if (user === null && username !== "" && username !== undefined) {
      res.send({'error': 'cant find user: ' + username});
    } else {

      CreateQuestions.addNewGame(user, dataGame).then((game) => {
        //if (err) return res.send(500, { error: err });
        res.send(game);
      });
    }
  });
});

module.exports = router;




