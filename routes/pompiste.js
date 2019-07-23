const express = require('express');
const verifyToken = require('../middleware/check-auth');
const PompisteModel = require('../models/Pompiste');

// setting router variable
const router = express.Router();


// add new pompiste
router.post('/add', verifyToken, (req, res) => {

    let pompiste = req.body.pompiste;
    console.log(pompiste);
    let new_pompiste = new PompisteModel(pompiste);

    new_pompiste.save().then(result => {
        res.status(201).json({
            pompiste: result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a pompiste
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    PompisteModel.findOne({
        _id: id
    }).exec()
        .then(pompiste => {
            if (!pompiste) {
                res.status(404).json({
                    message: "pompiste Introuvable!"
                });
            } else {

                PompisteModel.deleteMany({
                    _id: id
                }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Pompiste supprimé avec succés',
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

// get all pompistes
router.get('/list', verifyToken, (req, res) => {

    PompisteModel.find().select('-__v').exec()
        .then(pompistes => {
            res.status(200).json({
                pompistes
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// get total pompistes
router.get('/totalPompiste', verifyToken, (req, res) => {

    PompisteModel.find().select('-__v').exec()
        .then(pompistes => {
            res.status(200).json({
                total: pompistes.length
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update pompiste
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let pompiste = req.body.pompiste;


    PompisteModel.findOne({
        _id: id
    }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Pompiste Introuvable'
                });
            } else {
                PompisteModel.updateOne({
                    _id: id
                }, pompiste).exec()
                    .then(result => {
                        pompiste = {
                            _id: id,
                            ...pompiste
                        }
                        res.status(200).json({
                            pompiste
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