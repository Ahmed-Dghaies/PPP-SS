const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bonValeur = Schema({
    cardValue: { type: Number, required: true },
    numberOfCards: { type: Number, required: true },
    totalValue: { type: Number, required: true },
    sessionId: {type: String, required: true},
    state: { type: Number, required: true},
    date: { type: String, required: true }
});


module.exports = mongoose.model('bonValeur', bonValeur, 'BonValeur');