const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const session = Schema({
    date: { type: String, required: true },
    poste: {type: String},
    description: {type: String},
    state: {type: String},
    personnes: [{
        id_pompiste: { type: mongoose.Schema.Types.ObjectId },
        nom_pompiste: { type: String },
        heures_pres: { type: Number },
        indexs: { type: [String] }
    }]
});


module.exports = mongoose.model('session', session,'Session');