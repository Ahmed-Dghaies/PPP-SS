const mongoose = require('mongoose');


const clientSchema = mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true},
    email: {type: String},
    type: {type: String, required: true},
    state: {type: String, required: true},
    matFisc: {type: String, required: true},
    phone: {type: Number, required: true},
    plafondCredit: {type: Number, required: true},
    address:{
        city: {type: String, required: true},
        postal: {type: Number, required: true}
    },
    fax: {type: Number, required: true},
    region: {type: String, required: true}
});


module.exports = mongoose.model('client', clientSchema);