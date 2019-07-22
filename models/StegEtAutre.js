const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stegEtAutre = Schema({
    cardNumber: { type: String, required: true },
    clientNumber: { type: String, required: true },
    clientName: { type: String, required: true },
    chauffeur: { type: String, required: true },
    carburant: { type: String, required: true },
    numberOfLiters: { type: Number, required: true },
    literPrice: { type: Number, required: true },
    numberOfCards: { type: Number, required: true },
    cardValue: { type: Number, required: true },
    totalValue: { type: Number, required: true },
    sessionId: { type: String, required: true },
    date: { type: String, required: true }
});


module.exports = mongoose.model('stegEtAutre', stegEtAutre, 'StegEtAutre');