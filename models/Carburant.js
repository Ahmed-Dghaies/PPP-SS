const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const Carburant = Schema({
    ref: { type: String, required: true, unique: true},
    description: {type: String}
});


module.exports = mongoose.model('Carburant', Carburant);