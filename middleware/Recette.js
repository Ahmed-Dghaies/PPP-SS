const RecetteModel = require('../models/Recette');

const getCurrentRecette = () => {
    var datetime = new Date();
    var date = datetime.toISOString().slice(0, 10);
    var hour = datetime.getHours();
    var poste = '';
    if ((hour >= 6) && (hour <14)) {poste = 'P1';}
    else if ((hour >= 14) && (hour <22)) {poste = 'P2';}
    else if ((hour == 22) ||(hour == 23) || ((hour >= 0) && (hour < 6))) {poste = 'P3';}

    var model = RecetteModel.findOne({Date: date, poste: poste});
    return model;
}

module.exports = getCurrentRecette;