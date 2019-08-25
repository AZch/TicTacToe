var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    //user_side: Number, // 0 - нолики, 1 - крестики,
    sizeWin: {
        type: Number,
        required: [true, 'size to win required'],
    },
    size: {
        type: Number,
        required: [true, 'size game required']
    },
    isX: {
        type: Boolean
    },
    steps: [{ type: Schema.Types.ObjectID, ref: 'step' }],
    isUserWin: Boolean
});

module.exports = mongoose.model('game', gameSchema);