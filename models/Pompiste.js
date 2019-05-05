const mongoose = require('mongoose');


const pompisteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    }
});


module.exports = mongoose.model('pompiste', pompisteSchema);