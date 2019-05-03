const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carburant = Schema({
    carburant: { type: String, required: true },
    prix: {type: Number, required: true},
    identifiantPrix: {type: String}
});


module.exports = mongoose.model('carburant', carburant,'Carburant');