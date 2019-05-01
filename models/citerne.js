const mongoose = require('mongoose');


const citerneSchema = mongoose.Schema({
    identifiant: { type: String, required: true },
    capacite: {type: Number, required: true},
    contenu: {type: Number, required: true},
    type: {type: String, required: true}
    
});


module.exports = mongoose.model('citerne', citerneSchema);