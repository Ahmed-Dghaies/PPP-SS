const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payementCredit = Schema({
    clientNumber: { type: String, required: true },
    clientName: { type: String, required: true },
    payementValue: { type: Number, required: true },
    sessionId: { type: String, required: true },
    date: { type: String, required: true }
});


module.exports = mongoose.model('payementCredit', payementCredit,'PayementCredit');