var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        name: {
                type: String,
                required: [true, 'user name required'],
        },
        games: [{ type: Schema.Types.ObjectID, ref: 'game' }]
});

module.exports = mongoose.model('user', userSchema);