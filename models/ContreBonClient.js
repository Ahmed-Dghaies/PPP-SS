const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contreBonClient = Schema({
    cardNumber: { type: Number, required: true },
    cardValue: { type: Number },
    type: { type: String },
    date: { type: String, required: true },
    sessionId: {type: String, required: true }
});


module.exports = mongoose.model('contreBonClient', contreBonClient,'ContreBonClient');