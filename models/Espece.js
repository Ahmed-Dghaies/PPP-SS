const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const espece = Schema({
    type: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalValue: { type: Number, required: true },
    sessionId: { type: String, required: true },
    state: { type: String, required: true }
});


module.exports = mongoose.model('espece', espece, 'Espece');