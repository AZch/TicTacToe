var User = require('../shemas/user');
var FindQuestion = require('../dbData/findQuestions');
var CreateQuestions = require('../dbData/createQuestions');

module.exports = function (app) {
  app.get('/', (req, res) => {
    User.aggregate([
      { $match: {} }
    ], function (err, users) {
      if(err) return console.log(err);
      res.send(users);
    });
  });

  app.post('/', (req, res) => {
    FindQuestion.getUserByName(req.body.name).then( (user) => {
      let dataGame = { user_side: req.body.user_side, size: req.body.size, sizeWin: req.body.sizeWin };

      CreateQuestions.addNewGame(user, dataGame).then((user) => {
        if (err) return res.send(500, { error: err });
        res.send(user);
      });
    });
  });
};




