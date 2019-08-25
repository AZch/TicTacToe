const User = require('../shemas/user');
const Game = require('../shemas/game');
const ObjectID = require('mongodb').ObjectID;

async function getUserByName(name) {
    return await User.findOne({ name: name }).populate('games');
}

async function findGameById(id) {
    return Game.findOne({_id: new ObjectID(id)}).populate('steps');
}

async function getUserById(id) {
    return await User.findOne({ _id: id }).populate('games');
}

async function findAllWinGame() {
    return Game.aggregate([
        { $match: { isUserWin: true } },
        { $group: {
                _id: "$isUserWin",
                count: { $sum: 1 }
            }
        }
    ])
}

async function findAllLoseGame() {
    return Game.aggregate([
        { $match: { isUserWin: false } },
        { $group: {
                _id: "$isUserWin",
                count: { $sum: 1 }
            }
        }
    ])
}

module.exports.getUserByName = getUserByName;
module.exports.findGameById = findGameById;
module.exports.getUserById = getUserById;
module.exports.findAllWinGame = findAllWinGame;
module.exports.findAllLoseGame = findAllLoseGame;