const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cheque = Schema({
    payeeName: { type: String, required: true},
    chequeNumber: {type: String, required: true},
    bankName: {type: String, required: true},
    chequeValue: { type: Number, required: true},
    sessionId: {type: String, required: true},
    state: { type: String, required: true},
    date: { type: String, required: true }
});


module.exports = mongoose.model('cheque', cheque, 'Cheque');