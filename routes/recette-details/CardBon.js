const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const CarteBonModel = require('../../models/carteBon');

// setting router variable
const router = express.Router();


// add new carte Bon
router.post('/add', verifyToken, (req, res) => {

    let carteBon = req.body.carteBon;

    let new_carteBon = new CarteBonModel(carteBon);

    new_carteBon.save().then(result => {
            res.status(201).json({
                carteBon: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a carte Bon
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    CarteBonModel.findOne({
            _id: id
        }).exec()
        .then(carteBon => {
            if (!carteBon) {
                res.status(404).json({
                    message: "Carte Bon Introuvable!"
                });
            } else {

                CarteBonModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Carte Bon supprimé avec succés',
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

// get all carte Bons
router.get('/list', verifyToken, (req, res) => {

    CarteBonModel.find().select('-__v').exec()
        .then(carteBons => {
            res.status(200).json({
                carteBons
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update carte Bon
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let carteBon = req.body.carteBon;


    CarteBonModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Carte Bon Introuvable'
                });
            } else {
                CarteBonModel.updateOne({
                        _id: id
                    }, carteBon).exec()
                    .then(result => {
                        carteBon = {
                            _id: id,
                            ...carteBon
                        }
                        res.status(200).json({
                            carteBon
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