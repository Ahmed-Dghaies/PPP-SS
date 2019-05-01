const express = require('express');
const verifyToken = require('../middleware/check-auth');
const CiterneModel = require('../models/Citerne');

// setting router variable
const router = express.Router();

// add new citerne
router.post('/add', (req, res) => {

    let citerne = req.body.citerne;

    let new_citerne = new CiterneModel(citerne);
    new_citerne.identifiant = new_citerne.identifiant.toLowerCase();

    new_citerne.save().then(result => {
            res.status(201).json({
                citerne: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// get all citernes
router.get('/list',  (req, res) => {

    CiterneModel.find().select('-__v').exec()
        .then(citernes => {
            res.status(200).json({
                citernes
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// get citerne by type 
router.get('/list/byType', (req, res) => {

    let type = req.query.type.toLowerCase();

    CiterneModel.find({
            type
        }).exec()
        .then(citernes => {
            res.status(200).json({
                citernes
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        })
});

// delete a citerne
router.delete('/delete/:id', (req, res) => {

    let id = req.params.id;

    CiterneModel.findOne({
            _id: id
        }).exec()
        .then(citerne => {
            if (!citerne) {
                res.status(404).json({
                    message: "Citerne Introuvable!"
                });
            } else {

                CiterneModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Citerne supprimé avec succés',
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


// Update citerne
router.put('/update/:id',  (req, res) => {

    let id = req.params.id;
    let citerne = req.body.citerne;

    citerne.identifiant = citerne.identifiant.toLowerCase();
    citerne.type = citerne.type.toLowerCase();

    CiterneModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Citerne Introuvable'
                });
            } else {
                CiterneModel.updateOne({
                        _id: id
                    }, citerne).exec()
                    .then(result => {
                        citerne = {
                            _id: id,
                            ...citerne
                        }
                        res.status(200).json({
                            citerne
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