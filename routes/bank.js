const express = require('express');
const verifyToken = require('../middleware/check-auth');
const BankModel = require('../models/Bank');

// setting router variable
const router = express.Router();


// add new bank
router.post('/add', verifyToken,  (req, res) => {

    let bank = req.body;
    let new_type = new BankModel(bank);
    

    new_type.save().then(result => {
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

// delete a bank
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    BankModel.findOne({ _id: id }).exec()
        .then(bank => {
            if (!bank) {
                res.status(404).json({
                    message: "bank Introuvable!"
                });
            }
            else {

                BankModel.deleteMany({ _id: id }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'bank supprimé avec succés',
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

// get all banks
router.get('/list', verifyToken,  (req, res) => {

    BankModel.find(function (err, banks) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json(banks);
        }
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});



//  Defined update route
router.put('/update/:id', verifyToken, function (req, res) {
    let id = req.params.id;
    let bank = req.body;
    BankModel.findOne({ _id: id }).exec()
        .then(doc => {
            if (!doc)
                res.status(404).json({
                    message: 'Could not load Document'
                });
            else {
                BankModel.updateOne({ _id: id }, bank).exec()
                    .then(result => {
                        bank = { _id: id, ...bank }
                        res.status(200).json('Update Complete');
                    })
                    .catch(err => {
                        if (res.status === 400)
                            res.status(400).send("unable to update the database");
                        else if (res.status === 500)
                            res.status(500).json({
                                erreur: err
                            });
                    });
            }
        });
});

// get by Id
router.get('/list/:id', verifyToken, function (req, res) {
    let id = req.params.id;
    BankModel.findOne({_id: id},function(err, index) {
        if(err){
            console.log(err);
          }
          else {
            res.status(200).json(index);
          }
    }).catch(err => {
        res.status(500).json({
            erreur: err
        });
    });
});

// get by ref
router.get('/list/getbyref/:ref', verifyToken,  function (req, res) {
    let ref = req.params.ref;
    BankModel.findOne({ref: ref},function(err, index) {
        if(err){
            console.log(err);
          }
          else {
            res.status(200).json(index);
          }
    }).catch(err => {
        res.status(500).json({
            erreur: err
        });
    });
});

module.exports = router;