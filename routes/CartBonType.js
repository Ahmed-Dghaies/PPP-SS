const express = require('express');
const verifyToken = require('../middleware/check-auth');
const cardTypeModel = require('../models/CarteBonType');

// setting router variable
const router = express.Router();


// add new Type
router.post('/add', verifyToken, (req, res) => {

    let cardType = req.body;
    let new_type = new cardTypeModel(cardType);

    new_type.save().then(result => {
        res.status(201).json({
            cardType: result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a Type
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    cardTypeModel.findOne({ _id: id }).exec()
        .then(cardType => {
            if (!cardType) {
                res.status(404).json({
                    message: "type carte Introuvable!"
                });
            }
            else {

                cardTypeModel.deleteMany({ _id: id }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'type carte supprimé avec succés',
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

// get all types
router.get('/list', verifyToken, (req, res) => {

    cardTypeModel.find(function (err, cardTypes){
        if(err){
          console.log(err);
        }
        else {
          res.status(200).json(cardTypes);
        }
      })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// Defined edit route
router.get('/edit/:id', verifyToken, function (req, res) {
    let id = req.params.id;
    cardTypeModel.findById(id, function (err, cardType) {
        res.json(cardType);
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

//  Defined update route
router.put('/update/:id', verifyToken, function (req, res) {
    console.log('here')
    let id = req.params.id;
    let cardType = req.body;
    console.log(id)
    console.log(cardType)
    cardTypeModel.findOne({_id: id}).exec()
    .then(doc => {
        if (!doc)
        res.status(404).json({
            message: 'Could not load Document'
        });
        else {
            cardTypeModel.updateOne({_id: id}, cardType).exec()
            .then(result => {
                cardType = {_id: id, ...cardType}
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

module.exports = router;