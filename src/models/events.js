var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventShema = new Schema({
    name: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    category: String
});

module.exports = mongoose.model('Event',EventShema);