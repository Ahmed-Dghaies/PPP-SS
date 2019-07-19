const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const PayementCreditModel = require('../../models/PayementCredit');

// setting router variable
const router = express.Router();


// add new Credit
router.post('/add', verifyToken, (req, res) => {

    let payementCredit = req.body.payementCredit;

    let new_credit = new PayementCreditModel(credit);

    new_credit.save().then(result => {
            res.status(201).json({
                payementCredit: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a Credit
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    PayementCreditModel.findOne({
            _id: id
        }).exec()
        .then(credit => {
            if (!credit) {
                res.status(404).json({
                    message: "Payement Credit Introuvable!"
                });
            } else {

                PayementCreditModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Payement Credit supprimé avec succés',
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

// get all Credits
router.get('/list', verifyToken, (req, res) => {

    PayementCreditModel.find().select('-__v').exec()
        .then(payementCredits => {
            res.status(200).json({
                payementCredits
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update Credit
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let payementCredit = req.body.payementCredit;


    PayementCreditModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Credit Introuvable'
                });
            } else {
                PayementCreditModel.updateOne({
                        _id: id
                    }, payementCredit).exec()
                    .then(result => {
                        payementCredit = {
                            _id: id,
                            ...payementCredit
                        }
                        res.status(200).json({
                            credit
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