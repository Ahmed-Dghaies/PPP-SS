const express = require('express');
const verifyToken = require('../middleware/check-auth');
const CreditModel = require('../models/Credit');

// setting router variable
const router = express.Router();


// add new Credit
router.post('/add', verifyToken, (req, res) => {

    let credit = req.body.credit;

    let new_credit = new CreditModel(credit);

    new_credit.save().then(result => {
            res.status(201).json({
                credit: result
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

    CreditModel.findOne({
            _id: id
        }).exec()
        .then(credit => {
            if (!credit) {
                res.status(404).json({
                    message: "Credit Introuvable!"
                });
            } else {

                CreditModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Credit supprimé avec succés',
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

    CreditModel.find().select('-__v').exec()
        .then(credits => {
            res.status(200).json({
                credits
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
    let credit = req.body.credit;


    CreditModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Credit Introuvable'
                });
            } else {
                CreditModel.updateOne({
                        _id: id
                    }, credit).exec()
                    .then(result => {
                        credit = {
                            _id: id,
                            ...credit
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