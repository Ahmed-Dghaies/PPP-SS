const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bank = Schema({
    bankName: { type: String, required: true },
    bankCode: { type: Number, required: true },
    agencyCode: { type: Number, required: true },
    agencyName: {type: String, required: true},
    comptoir: { type: Number },
    adress: { type: String },
    tel: { type: Number },
    responsibleName: { type: String },
    dAgrem: { type: String },
    dOuv: { type: String },
    dFerm: { type: String }
});


module.exports = mongoose.model('bank', bank, 'Banks');