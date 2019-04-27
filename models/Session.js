const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const session = Schema({
    date: { type: String, required: true },
    poste: {type: String},
    description: {type: String},
    state: {type: String} 
});


module.exports = mongoose.model('session', session,'Session');