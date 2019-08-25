const User = require('../shemas/user');
const Game = require('../shemas/game');
const ObjectID = require('mongodb').ObjectID;

async function getUserByName(name) {
    return await User.findOne({ name: name }).populate('games');
}

async function findGameById(id) {
    return Game.findOne({_id: new ObjectID(id)}).populate('steps');
}

async function findUserByGameId(id) {
    return User.findOne({ "games": new ObjectID(id) });
}

async function getUserById(id) {
    return User.findOne({ _id: id }).populate('games');
}

async function findAllWinGame(id) {
    return Game.aggregate([
        { $match: { isUserWin: true } },
        { $group: {
                _id: "$isUserWin",
                count: { $sum: 1 }
            }
        }
    ])
}

async function findAllWinGameUser(id) {
    return User.aggregate([
        { $match: { _id: id } },
        { $lookup: {
                from: "games",
                localField: "games",
                foreignField: "_id",
                as: "games"}},
        { $unwind: "$games" },
        { $match: { "games.isUserWin": true } },
        { $group: {
                _id: "$isUserWin",
                count: { $sum: 1 }
            } }
    ]);
}

async function findAllLoseGameUser(id) {
    return User.aggregate([
        { $match: { _id: id } },
        { $lookup: {
                from: "games",
                localField: "games",
                foreignField: "_id",
                as: "games"}},
        { $unwind: "$games" },
        { $match: { "games.isUserWin": false } },
        { $group: {
                _id: "$isUserWin",
                count: { $sum: 1 }
            } }
    ]);
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
module.exports.findAllLoseGameUser = findAllLoseGameUser;
module.exports.findAllWinGameUser = findAllWinGameUser;
module.exports.findUserByGameId = findUserByGameId;