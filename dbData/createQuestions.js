var Game = require('../shemas/game');
var Step = require('../shemas/step');

async function addNewGame(user, dataGame) {
    const game = await Game.create(dataGame);
    if (user !== null) {
        user.games.push(game);
        await user.save();
    }
    return game;
}

async function insertStepToGame(game, dataStep) {
    const step = await Step.create(dataStep);
    game.steps.push(step);
    await game.save();
    return step;
}

module.exports.addNewGame = addNewGame;
module.exports.insertStepToGame = insertStepToGame;
