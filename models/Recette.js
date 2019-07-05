const mongoose = require('mongoose');
const indexVM = require('./IndexVM');

const recetteSchema = mongoose.Schema({
    date: { type: String, required: true },
    poste: {type: String, required: true},
    sessionId: {type: String, required: true},
    rIndex: {type: [indexVM], required: true}
});


module.exports = mongoose.model('Recette', recetteSchema, 'Recette');