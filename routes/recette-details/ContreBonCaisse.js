const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const ContreBonCaisseModel = require('../../models/ContreBonCaisse');

// setting router variable
const router = express.Router();


// add new ContreBonCaisse
router.post('/add', verifyToken, (req, res) => {

    let contreBonCaisse = req.body.contreBonCaisse;

    let new_contreBonCaisse = new ContreBonCaisseModel(contreBonCaisse);

    new_contreBonCaisse.save().then(result => {
            res.status(201).json({
                contreBonCaisse: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a ContreBonCaisse
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    ContreBonCaisseModel.findOne({
            _id: id
        }).exec()
        .then(contreBonCaisse => {
            if (!contreBonCaisse) {
                res.status(404).json({
                    message: "Contre Bon Caisse Introuvable!"
                });
            } else {

                ContreBonCaisseModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Contre Bon Caisse supprimé avec succés',
                            count: result.deletedCount
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            erreur: err
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });

});

// get all ContreBonCaisses
router.get('/list', verifyToken, (req, res) => {

    ContreBonCaisseModel.find().select('-__v').exec()
        .then(contreBonCaisses => {
            res.status(200).json({
                contreBonCaisses
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update ContreBonCaisse
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let contreBonCaisse = req.body.contreBonCaisse;


    ContreBonCaisseModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Contre Bon Caisse Introuvable'
                });
            } else {
                ContreBonCaisseModel.updateOne({
                        _id: id
                    }, contreBonCaisse).exec()
                    .then(result => {
                        contreBonCaisse = {
                            _id: id,
                            ...contreBonCaisse
                        }
                        res.status(200).json({
                            contreBonCaisse
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            erreur: err
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});


module.exports = router;