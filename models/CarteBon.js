const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carteBon = Schema({
    cardType: { type: String, required: true },
    cardValue: { type: Number, required: true },
    numberOfCards: { type: Number, required: true},
    date: { type: String, required: true }
});


module.exports = mongoose.model('carteBon', carteBon, 'CardBon');