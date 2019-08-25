const Game = require('../shemas/game');

async function updateGame(game) {
    return await game.save();
}

module.exports.updateGame = updateGame;