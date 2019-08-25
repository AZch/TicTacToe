const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new Schema({
    coord_x: {
        type: Number,
        required:[true,"coordRequired"],
    },
    coord_y: {
        type: Number,
        required:[true,"coordRequired"],
    },
    isUser: {
        type: Boolean,
        required:[true,"coordRequired"],
    }
});

module.exports = mongoose.model('step', stepSchema);