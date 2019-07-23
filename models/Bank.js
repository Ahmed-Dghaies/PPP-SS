const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bank = Schema({
    bankName: { type: String, required: true },
    bankCode: { type: Number, required: true },
    agencyCode: { type: Number, required: true },
    agencyName: {type: String, required: true},
    comptoir: { type: String, required: true},
    adress: { type: Number, required: true },
    tel: { type: Number, required: true },
    responsibleName: { type: String, required: true },
    dAgrem: { type: String, required: true },
    dOuv: { type: String, required: true },
    dFerm: { type: String, required: true }
});


module.exports = mongoose.model('bank', bank, 'Bank');