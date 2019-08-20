var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        name: String,
        games: [{ type: Schema.Types.ObjectID, ref: 'game' }]
});

module.exports = mongoose.model('user', userSchema);