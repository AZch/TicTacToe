var Game = require('../shemas/game');
var Step = require('../shemas/step');

async function addNewGame(user, dataGame) {
    user.games.push(await Game.create(dataGame));
    return await user.save();
}

async function insertStepToGame(game, dataStep) {
    const step = await Step.create(dataStep);
    game.steps.push(step);
    await game.save();
    return step;
}

export { addNewGame, insertStepToGame }