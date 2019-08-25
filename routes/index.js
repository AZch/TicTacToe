const User = require('../shemas/user');
const FindQuestion = require('../dbData/findQuestions');
const CreateQuestions = require('../dbData/createQuestions');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  User.aggregate([
    { $match: {} }
  ], function (err, users) {
    if(err) res.send({error: 'cant find users'});
    res.send(users);
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
        res.send(game);
      }).catch((error) => {
        res.send({error: 'Cant create game'})
      });
    }
  });
});

module.exports = router;




