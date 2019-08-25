var FindQuestions = require('../dbData/findQuestions');
var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res, next) {
    const name = req.params.name;
    FindQuestions.getUserByName(name).then((user) => {
        if (user === null) {
            res.send({error: 'cant find user'});
        } else {
            FindQuestions.findAllWinGameUser(user._id).then((resultWins) => {
                FindQuestions.findAllLoseGameUser(user._id).then((resultLose) => {
                    const data = {
                        win: (resultWins.length > 0 ? resultWins[0].count : 0),
                        lose: (resultLose.length > 0 ? resultLose[0].count : 0)
                    };
                    res.send(data);
                });
            });
        }
    });

});

router.get('/', function(req, res, next) {
    FindQuestions.findAllWinGame().then((resultWins) => {
        FindQuestions.findAllLoseGame().then((resultLose) => {
            const data = {
                win: (resultWins.length > 0 ? resultWins[0].count : 0),
                lose: (resultLose.length > 0 ? resultLose[0].count : 0)
            };
            res.send(data);
        });
    });
});


module.exports = router;
