const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bonValeur = Schema({
    cardNumber: { type: String, required: true },
    clientCode: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAdress: { type: String, required: true },
    cardValue: { type: Number, required: true },
    date: { type: String, required: true }
});


module.exports = mongoose.model('bonValeur', bonValeur, 'BonValeur');