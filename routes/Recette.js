const express = require('express');
const verifyToken = require('../middleware/check-auth');
const recetteModel = require('../models/Recette');
const currentRecette = require('../middleware/Recette');
const IndexVM = require('../models/IndexVM');

// setting router variable
const router = express.Router();

const getDatePoste = () => {
    var datetime = new Date();
    var date = datetime.toISOString().slice(0, 10);
    var hour = datetime.getHours();
    dd = new Date(datetime.setDate(datetime.getDate() - 1))
    var yesterday = dd.toISOString().slice(0, 10);
    var poste = '';
    if ((hour >= 6) && (hour < 14)) { poste = 'P1'; }
    else if ((hour >= 14) && (hour < 22)) { poste = 'P2'; }
    else if ((hour == 22) || (hour == 23) || (hour == 0)) { poste = 'P3'; }
    else if ((hour > 0) && (hour < 6)) { poste = 'P3'; date = yesterday; }
    return [date, poste];
}

//add relevé index
router.post('/addReleveIndex', verifyToken, (req, res) => {
    let index = req.body;
    let quantite = index.arrive - index.depart;
    let prix = index.prix;
    var PD = getDatePoste();
    recetteModel.findOne({ date: PD[0], poste: PD[1] }).exec()
        .then(recette => {
            if (!recette) {
                res.status(404).json({
                    message: "recette introuvable!"
                });
            }
            else {
                indexVM = {
                    reference: index.reference,
                    depart: index.depart,
                    arrive: index.arrive,
                    quantite: quantite,
                    prix: prix,
                    prevue: quantite * prix,
                    pompiste: index.pompiste
                };
                recette.rIndex.push(indexVM);
                recetteModel.updateOne({ _id: recette._id }, recette).exec()
                    .then(result => {
                        if (!result) {
                            res.status(404).json({
                                message: "ajout echoué"
                            });
                        }
                        else {
                            res.status(200).json(result);
                        }
                    });
            }
        });

});

//add multiple relevé index
router.post('/addMultipleReleveIndex', verifyToken, (req, res) => {
    let indexs = req.body;
    var PD = getDatePoste();
    console.log(PD);
    recetteModel.findOne({ date: PD[0], poste: PD[1] }).exec()
        .then(recette => {
            if (!recette) {
                res.status(404).json({
                    message: "recette introuvable!"
                });
            }
            else {
                var i;
                for (i = 0; i < indexs.length; i++) {
                    indexVM = {
                        reference: indexs[i].reference,
                        depart: indexs[i].depart,
                        arrive: indexs[i].arrive,
                        quantite: indexs[i].arrive - indexs[i].depart,
                        prix: indexs[i].prix,
                        prevue: (indexs[i].arrive - indexs[i].depart) * indexs[i].prix,
                        pompiste: indexs[i].pompiste
                    };
                    recette.rIndex.push(indexVM);
                }
                recetteModel.updateOne({ _id: recette._id }, recette).exec()
                        .then(result => {
                            if (!result) {
                                res.status(404).json({
                                    message: "ajout echoué"
                                });
                            }
                            else {
                                res.status(200).json(result);
                            }
                        });

            }
        });

});

// delete a Type
router.delete('/deleteReleveIndex/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    var PD = getDatePoste()

    recetteModel.findOne({ date: PD[0], poste: PD[1] }).exec()
        .then(recette => {
            if (!recette) {
                res.status(404).json({
                    message: "recette introuvable!"
                });
            }
            else {
                console.log(id);
                deleteIndex = recette.rIndex.findIndex(x => x._id == id);
                recette.rIndex.splice(deleteIndex, 1);
                console.log(recette.rIndex);
                recetteModel.updateOne({ _id: recette._id }, recette).exec()
                    .then(result => {
                        if (!result) {
                            res.status(404).json({
                                message: "une erreur s'est produite lors de la suppression de l'index"
                            });
                        }
                        else {
                            res.status(200).json(result);
                        }
                    });
            }
        });
});

// get all types
router.get('/listReleveIndex/:sId', verifyToken, (req, res) => {
    let sessionId = req.params.sId;
    recetteModel.findOne({ sessionId: sessionId }).exec()
        .then(recette => {
            if (!recette) {
                res.status(404).json({
                    message: "recette introuvable!"
                });
            }
            else {
                res.status(200).json(recette.rIndex);
            }
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// get total revenue recettes by month
router.get('/totalRevenue', verifyToken, (req, res) => {

    let month = parseInt(req.query.month);

    recetteModel.find().lean().exec()
        .then(recettes => {
            let total = 0;
            recettesByMonth = recettes.filter(recette => parseInt(recette.date.slice(5, 7)) === month);
            recettesByMonth.forEach(recette => {
                recette.rIndex.forEach(r => {
                    total += r.prevue;
                })
            });
            res.status(200).json({
                total
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// get quantité carburant recettes by month
router.get('/quantiteCarburant', verifyToken, (req, res) => {

    let month = parseInt(req.query.month);

    recetteModel.find().lean().exec()
        .then(recettes => {
            let quantite = 0;
            recettesByMonth = recettes.filter(recette => parseInt(recette.date.slice(5, 7)) === month);
            recettesByMonth.forEach(recette => {
                recette.rIndex.forEach(r => {
                    quantite += r.quantite;
                })
            });
            res.status(200).json({
                quantite
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});


// Defined edit route
router.get('/editReleveIndex/:id', verifyToken, function (req, res) {
    let id = req.params.id;
    recetteModel.findById(id, function (err, recette) {
        res.json(recette);
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

//  Defined update route
router.put('/updateReleveIndex/:id', verifyToken, function (req, res) {
    let id = req.params.id;
    let new_releveIndex = req.body;
    let quantite = new_releveIndex.arrive - new_releveIndex.depart;
    let prix = new_releveIndex.prix;
    var PD = getDatePoste()
    recetteModel.findOne({ date: PD[0], poste: PD[1] }).exec()
        .then(recette => {
            if (!recette)
                res.status(404).json({
                    message: 'recette introuvable'
                });
            else {
                updateIndex = recette.rIndex.findIndex(x => x._id == id);
                releveIndex = {
                    reference: new_releveIndex.reference,
                    depart: new_releveIndex.depart,
                    arrive: new_releveIndex.arrive,
                    quantite: quantite,
                    prix: prix,
                    prevue: (quantite * prix).toFixed(3),
                    pompiste: new_releveIndex.pompiste
                };
                console.log(releveIndex);
                recette.rIndex[updateIndex] = releveIndex;
                recetteModel.updateOne({ _id: recette._id }, recette).exec()
                    .then(result => {
                        if (!result) {
                            res.status(404).json({
                                message: "une erreur s'est produite lors de la mise à jour du releve index"
                            });
                        }
                        else {
                            res.status(200).json(result);
                        }
                    })
                    .catch(err => {
                        if (res.status === 400)
                            res.status(400).send("unable to update the database");
                        else if (res.status === 500)
                            res.status(500).json({
                                erreur: err
                            });
                    });
            }
        });
});

module.exports = router;