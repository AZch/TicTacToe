var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    //user_side: Number, // 0 - нолики, 1 - крестики,
    sizeWin: Number,
    size: Number,
    steps: [{ type: Schema.Types.ObjectID, ref: 'step' }]
});

module.exports = mongoose.model('game', gameSchema);