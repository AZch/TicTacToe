const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
                type: String,
                required: [true, 'user name required'],
        },
        games: [{ type: Schema.Types.ObjectID, ref: 'game' }]
});

module.exports = mongoose.model('user', userSchema);