const express = require('express');
const verifyToken = require('../middleware/check-auth');
const BankModel = require('../models/Bank');

// setting router variable
const router = express.Router();


// add new Bank
router.post('/add', verifyToken, (req, res) => {

    let bank = req.body.bank;
    let new_bank = new BankModel(bank);

    new_bank.save().then(result => {
        res.status(201).json({
            bank: result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a Bank
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    BankModel.findOne({
        _id: id
    }).exec()
        .then(bank => {
            if (!bank) {
                res.status(404).json({
                    message: "Bank Introuvable!"
                });
            } else {

                BankModel.deleteMany({
                    _id: id
                }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Bank supprimé avec succés',
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

// get all Banks
router.get('/list', verifyToken, (req, res) => {

    BankModel.find().select('-__v').exec()
        .then(banks => {
            res.status(200).json({
                banks
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// get total Banks
router.get('/totalBank', verifyToken, (req, res) => {

    BankModel.find().select('-__v').exec()
        .then(banks => {
            res.status(200).json({
                total: banks.length
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update Bank
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let bank = req.body.bank;


    BankModel.findOne({
        _id: id
    }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Bank Introuvable'
                });
            } else {
                BankModel.updateOne({
                    _id: id
                }, bank).exec()
                    .then(result => {
                        bank = {
                            _id: id,
                            ...bank
                        }
                        res.status(200).json({
                            bank
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