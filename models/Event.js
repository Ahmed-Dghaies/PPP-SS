const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('event', eventSchema);