const mongoose = require('mongoose');


const citerneSchema = mongoose.Schema({
    code: { type: String, required: true },
    libelle:{type : String, required : true},
    capacite: {type: Number, required: true},
    carburant :{type : String , require :true},
    tolerance : {type : Number, require: true},
    stock : {type: Number, require: true},
    ordre : {type : Number, required : true},
    etat : {type : String, require: true}

    
});


module.exports = mongoose.model('citerne', citerneSchema);