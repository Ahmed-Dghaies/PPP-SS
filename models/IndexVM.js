const mongoose = require('mongoose');


const indexVMSchema = mongoose.Schema({
    reference: { type: String, required: true },
    depart: {type: Number, required: true},
    arrive: {type: Number, required: true},
    quantite: {type: Number},
    prix: {type: Number},
    prevue: {type: Number},
    pompiste: {
        _id: { type: mongoose.Schema.Types.ObjectId },
        nom: { type: String }
    }
});

module.exports = indexVMSchema;