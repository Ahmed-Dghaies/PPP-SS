const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const ContreBonClientModel = require('../../models/ContreBonClient');

// setting router variable
const router = express.Router();


// add new ContreBonClient
router.post('/add', verifyToken, (req, res) => {

    let contreBonClient = req.body.contreBonClient;

    let new_contreBonClient = new ContreBonClientModel(contreBonClient);

    new_contreBonClient.save().then(result => {
            res.status(201).json({
                contreBonClient: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a ContreBonClient
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    ContreBonClientModel.findOne({
            _id: id
        }).exec()
        .then(contreBonClient => {
            if (!contreBonClient) {
                res.status(404).json({
                    message: "Contre Bon Client Introuvable!"
                });
            } else {

                ContreBonClientModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Contre Bon Client supprimé avec succés',
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

// get all ContreBonClients
router.get('/list', verifyToken, (req, res) => {

    ContreBonClientModel.find().select('-__v').exec()
        .then(contreBonClients => {
            res.status(200).json({
                contreBonClients
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update ContreBonClient
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let contreBonClient = req.body.contreBonClient;


    ContreBonClientModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Contre Bon Client Introuvable'
                });
            } else {
                ContreBonClientModel.updateOne({
                        _id: id
                    }, contreBonClient).exec()
                    .then(result => {
                        contreBonClient = {
                            _id: id,
                            ...contreBonClient
                        }
                        res.status(200).json({
                            contreBonClient
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