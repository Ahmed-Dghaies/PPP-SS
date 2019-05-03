const express = require('express');
const verifyToken = require('../middleware/check-auth');
const distributeurModel = require('../models/Distributeur');

// setting router variable
const router = express.Router();


// add new distributeur
router.post('/add', verifyToken, (req, res) => {

    let distributeur = req.body;
    let new_distributeur = new distributeurModel(distributeur);

    new_distributeur.save().then(result => {
        res.status(201).json({
            distributeur: result
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

    distributeurModel.findOne({ _id: id }).exec()
        .then(distributeur => {
            if (!distributeur) {
                res.status(404).json({
                    message: "Distributeur Introuvable!"
                });
            }
            else {

                distributeurModel.deleteMany({ _id: id }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Distributeur supprimé avec succés',
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

    distributeurModel.find(function (err, distributeurs){
        if(err){
          console.log(err);
        }
        else {
          res.status(200).json(distributeurs);
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
    distributeurModel.findById(id, function (err, distributeur) {
        res.json(distributeur);
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
    let distributeur = req.body;
    distributeurModel.findOne({_id: id}).exec()
    .then(doc => {
        if (!doc)
        res.status(404).json({
            message: 'Could not load Document'
        });
        else {
            distributeurModel.updateOne({_id: id}, distributeur).exec()
            .then(result => {
                distributeur = {_id: id, ...distributeur}
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