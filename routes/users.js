var FindQuestions = require('../dbData/findQuestions');
var Game = require('../shemas/game');

module.exports = function (app) {
  app.get('/user/:id', (req, res) => {
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
};
