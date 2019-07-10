const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const ChequeModel = require('../../models/Cheque');

// setting router variable
const router = express.Router();


// add new Cheque
router.post('/add', verifyToken, (req, res) => {

    let cheque = req.body.cheque;

    let new_cheque = new ChequeModel(cheque);

    new_cheque.save().then(result => {
            res.status(201).json({
                cheque: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a Cheque
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    ChequeModel.findOne({
            _id: id
        }).exec()
        .then(cheque => {
            if (!cheque) {
                res.status(404).json({
                    message: "Cheque Introuvable!"
                });
            } else {

                ChequeModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Cheque supprimé avec succés',
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

// get all Cheques
router.get('/list', verifyToken, (req, res) => {

    ChequeModel.find().select('-__v').exec()
        .then(cheques => {
            res.status(200).json({
                cheques
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update Cheque
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let cheque = req.body.cheque;


    ChequeModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Cheque Introuvable'
                });
            } else {
                ChequeModel.updateOne({
                        _id: id
                    }, cheque).exec()
                    .then(result => {
                        cheque = {
                            _id: id,
                            ...cheque
                        }
                        res.status(200).json({
                            cheque
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