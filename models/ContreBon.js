const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contreBon = Schema({
    cardNumber: { type: Number, required: true },
    cardValue: { type: Number },
    type: { type: String },
    state: { type: String, required: true },
    date: { type: String, required: true }
});


module.exports = mongoose.model('contreBon', contreBon,'ContreBon');