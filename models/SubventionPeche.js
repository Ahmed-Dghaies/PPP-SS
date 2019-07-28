const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subventionPeche = Schema({
    cardNumber: { type: String, required: true },
    payeeName: { type: String, required: true },
    motorPower: { type: Number, required: true },
    boatName: { type: String, required: true },
    numberOfLiters: { type: Number, required: true },
    literPrice: { type: Number, required: true },
    cardValue: { type: Number, required: true },
    sessionId: { type: String, required: true },
    state: { type: String, required: true },
    date: { type: String, required: true }
});


module.exports = mongoose.model('subventionPeche', subventionPeche, 'SubventionPeche');