const CreateQuestions = require('../dbData/createQuestions');
const FindQuestions = require('../dbData/findQuestions');
const UpdateQuestion = require('../dbData/updateQuestions');
const ProcessGame = require('../TicTacToe/processGame');
const express = require('express');
const router = express.Router();


router.get('/:id', function(req, res, next) {
    FindQuestions.findGameById(req.params.id).then((item) => {
        if (item !== null) {
            res.send(item);
        } else {
            res.send({error: 'cant find game'});
        }
    }).catch((error) => {
        res.send({error: 'cant find game'});
    });
});

router.post('/:id', function (req, res, next) {
    const dataStep = { coord_x: req.body.coord_x, coord_y: req.body.coord_y, isUser: true };
    FindQuestions.findGameById(req.params.id).then((game) => { // find game by id

        if (game !== null && // game exist
            dataStep.coord_x < game.size && dataStep.coord_x >= 0 && // coordinate x is valid
            dataStep.coord_y < game.size && dataStep.coord_y >= 0 && // coordinate y is valid
            ProcessGame.isValidStep(game, dataStep)) { // step is not exist

            CreateQuestions.insertStepToGame(game, dataStep).then((step) => { // insert user step to DB
                let processStep = ProcessGame.processStep(game, step);
                if (typeof processStep !== 'string' && !(processStep instanceof String)) {
                    let isEnd = processStep.end;
                    if (processStep.x === undefined && processStep.y === undefined && isEnd !== undefined) {
                        game.isUserWin = false;
                        UpdateQuestion.updateGame(game);
                        res.send({isUserWin: false});
                    } else {

                        const dataStep = {coord_x: processStep.x, coord_y: processStep.y, isUser: false};
                        CreateQuestions.insertStepToGame(game, dataStep).then((step) => { // insert step computer to DB
                            if (isEnd !== undefined && isEnd) { // check if result (computer win)
                                game.isUserWin = false;
                                UpdateQuestion.updateGame(game);
                                res.send({isUserWin: false, step: step});
                            } else {
                                res.send(step);
                            }
                        }).catch((error) => {
                            res.send({error: 'cant make computer step'});
                        });
                    }

                } else {
                    game.isUserWin = true;
                    UpdateQuestion.updateGame(game);
                    res.send({isUserWin: true});
                }
            }).catch((error) => {
                res.send({error: 'cant make user step'});
            });
        } else {
            res.send({error: 'bad game id or coordination step'});
        }
    }).catch((error) => {
        res.send({error: 'cant find game'});
    });
});

module.exports = router;

