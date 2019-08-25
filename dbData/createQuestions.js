const Game = require('../shemas/game');
const Step = require('../shemas/step');
const User = require('../shemas/user');

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

async function addNewUser(userData) {
    return User.create(userData);
}

module.exports.addNewGame = addNewGame;
module.exports.insertStepToGame = insertStepToGame;
module.exports.addNewUser = addNewUser;
