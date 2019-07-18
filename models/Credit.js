const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credit = Schema({
    clientNumber: { type: String, required: true },
    clientName: { type: String, required: true },
    creditOriginalValue: { type: Number, required: true },
    creditRestValue: { type: Number, required: true },
    date: { type: String, required: true }
});


module.exports = mongoose.model('credit', credit,'Credit');