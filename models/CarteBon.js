const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carteBon = Schema({
    cardType: { type: String, required: true },
    cardNumber: { type: String, required: true },
    litreNumber: { type: Number, required: true },
    clientCode: { type: String, required: true },
    cardValue: { type: Number, required: true },
    date: { type: String, required: true }
});


module.exports = mongoose.model('carteBon', carteBon, 'CardBon');