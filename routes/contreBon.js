const express = require('express');
const verifyToken = require('../middleware/check-auth');
const ContreBonModel = require('../models/ContreBon');

// setting router variable
const router = express.Router();


// add new contre Bon
router.post('/add/:numberOfCards', verifyToken, (req, res) => {

    let numberOfCards = req.params.numberOfCards;
    let contreBon = req.body.contreBon;

    var i;
    for (i = 0; i < numberOfCards; i++) {
        let new_contreBon = new ContreBonModel(contreBon);
        console.log(new_contreBon);
        /*new_contreBon.save().then(result => {
            res.status(201).json({
                contreBon: result
            });
        })
            .catch(err => {
                res.status(500).json({
                    erreur: err
                });
                console.log(err);
            });*/
            contreBon.cardNumber = contreBon.cardNumber + 1;
    }

});

// delete a contre Bon
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    ContreBonModel.findOne({
        _id: id
    }).exec()
        .then(contreBon => {
            if (!contreBon) {
                res.status(404).json({
                    message: "contre Bon Introuvable!"
                });
            } else {

                ContreBonModel.deleteMany({
                    _id: id
                }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'contreBon supprimé avec succés',
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

// get all contre Bons
router.get('/list', verifyToken, (req, res) => {

    ContreBonModel.find().select('-__v').exec()
        .then(contreBons => {
            res.status(200).json({
                contreBons
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// get total contreBons
router.get('/totalcontreBon', verifyToken, (req, res) => {

    ContreBonModel.find().select('-__v').exec()
        .then(contreBons => {
            res.status(200).json({
                total: contreBons.length
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update contreBon
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let contreBon = req.body.contreBon;


    ContreBonModel.findOne({
        _id: id
    }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'contre Bon Introuvable'
                });
            } else {
                ContreBonModel.updateOne({
                    _id: id
                }, contreBon).exec()
                    .then(result => {
                        contreBon = {
                            _id: id,
                            ...contreBon
                        }
                        res.status(200).json({
                            contreBon
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