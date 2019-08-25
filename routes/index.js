const User = require('../shemas/user');
const FindQuestion = require('../dbData/findQuestions');
const CreateQuestions = require('../dbData/createQuestions');
const ProcessGame = require('../TicTacToe/processGame');
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
  const { username, sizeGame, countWin, isX } = req.body;
  if (sizeGame < countWin || sizeGame === '' || countWin === '' ||
      sizeGame === undefined || countWin === undefined ||
      sizeGame === 0 || countWin === 0) {
    res.send({error: 'Bad game parametrs'});
  } else {
    FindQuestion.getUserByName(username).then((user) => {
      let dataGame = {size: sizeGame, sizeWin: countWin, isX: isX};

      if (user === null && username !== "" && username !== undefined) {
        res.send({'error': 'cant find user: ' + username});
      } else {

        CreateQuestions.addNewGame(user, dataGame).then((game) => {
          if (!isX) {
            const processStep = ProcessGame.makeFirstRandomStep(game);
            const dataStep = {coord_x: processStep.x, coord_y: processStep.y, isUser: false};
            CreateQuestions.insertStepToGame(game, dataStep).then((step) => {
                 res.send(game);
            });
          } else {
            res.send(game);
          }
        }).catch((error) => {
          res.send({error: 'Cant create game'})
        });
      }
    });
  }
});

module.exports = router;




