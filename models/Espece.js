const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const espece = Schema({
    type: { type: Number, required: true },
    quantity: { type: Number, required: true },
    state: { type: String, required: true }
});


module.exports = mongoose.model('espece', espece, 'Espece');