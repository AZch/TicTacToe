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
  const sizeGame = req.body.sizeGame;
  const countWin = req.body.countWin;
  if (sizeGame < countWin || sizeGame === '' || countWin === '' ||
      sizeGame === undefined || countWin === undefined ||
      sizeGame === 0 || countWin === 0) {
    res.send({error: 'Bad game parametrs'});
  } else {
    FindQuestion.getUserByName(username).then((user) => {
      let dataGame = {size: sizeGame, sizeWin: countWin};

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
  }
});

module.exports = router;




