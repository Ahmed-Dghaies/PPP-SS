const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrixCarburant = Schema({
    carburant: { type: String, required: true },
    prix: {type: Number, required: true},
    identifiantPrix: {type: String},
    date: {type: String}
});


module.exports = mongoose.model('PrixCarburant', PrixCarburant,'PrixCarburant');