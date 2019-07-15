const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carteBonType = Schema({
    cardCode: { type: String, required: true },
    cardDescription: {type: String},
    cardCarburant: { type: String, required: true }
});


module.exports = mongoose.model('carteBonType', carteBonType,'CBType');