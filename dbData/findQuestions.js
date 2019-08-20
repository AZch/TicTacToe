var User = require('../shemas/user');

async function getUserByName(name) {
    return await User.findOne({ name: name }).populate('games');
}

async function findGameById(id) {
    return await Game.
    findOne({ _id: new ObjectID(id) }).
    populate('steps');
}

async function getUserById(id) {
    return await User.findOne({ _id: id }).populate('games');
}

module.exports.getUserByName = getUserByName;
module.exports.findGameById = findGameById;
module.exports.getUserById = getUserById;