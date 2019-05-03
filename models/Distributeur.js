const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distributeurSchema = Schema({
    reference: { type: String, required: true },
    libelle: {type: String},
    numImmatriculation: {type: Number},
    anneeFabrication: {type: Number}
});


module.exports = mongoose.model('distributeur', distributeurSchema, 'Distributeur');