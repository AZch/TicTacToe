var CreateQuestions = require('../dbData/createQuestions');
var FindQuestions = require('../dbData/findQuestions');
var ProcessGame = require('../TicTacToe/processGame');

module.exports = function (app) {
    app.get('/game/:id', (req, res) => {
        FindQuestions.findGameById(req.params.id).then((item) => {
                res.send(item);
           //res.send(item);
        });
    });

    app.post('/game/:id', (req, res) => {
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

                        const dataStep = { coord_x: processStep.x, coord_y: processStep.y, isUser: false };
                        CreateQuestions.insertStepToGame(game, dataStep).then((step) => { // insert step computer to DB
                            if (isEnd !== undefined && isEnd) { // check if result (computer win)
                                res.send({'data': 'end'});
                            } else {
                                res.send(step);
                            }
                        });

                    } else {
                        res.send(processStep); // user win
                    }
                });
            } else {
                res.send({'data': 'trable'}) // bad data
                // TODO
            }
        });
    });
};

