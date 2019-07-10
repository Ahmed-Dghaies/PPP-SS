const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const BonValeurModel = require('../../models/BonValeur');

// setting router variable
const router = express.Router();


// add new Bon Valeur
router.post('/add', verifyToken, (req, res) => {

    let bonValeur = req.body.bonValeur;

    let new_bonValeur = new BonValeurModel(bonValeur);

    new_bonValeur.save().then(result => {
            res.status(201).json({
                bonValeur: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a Bon Valeur
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    BonValeurModel.findOne({
            _id: id
        }).exec()
        .then(bonValeur => {
            if (!bonValeur) {
                res.status(404).json({
                    message: "Bon Valeur Introuvable!"
                });
            } else {

                BonValeurModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Bon Valeur supprimé avec succés',
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

// get all Bon Valeurs
router.get('/list', verifyToken, (req, res) => {

    BonValeurModel.find().select('-__v').exec()
        .then(bonValeurs => {
            res.status(200).json({
                bonValeurs
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update Bon Valeur
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let bonValeur = req.body.bonValeur;


    BonValeurModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Bon Valeur Introuvable'
                });
            } else {
                BonValeurModel.updateOne({
                        _id: id
                    }, bonValeur).exec()
                    .then(result => {
                        bonValeur = {
                            _id: id,
                            ...bonValeur
                        }
                        res.status(200).json({
                            bonValeur
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