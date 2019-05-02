const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const index = Schema({
    reference: { type: String, required: true},
    valeurIndex: { type: Number},
    dernierDate: { type: String},
    carburant: { type: String},
    citerne: { type: String},
    distributeur: { type: String}
});


module.exports = mongoose.model('index', index, 'Index');