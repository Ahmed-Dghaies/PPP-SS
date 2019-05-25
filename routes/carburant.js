const express = require('express');
const verifyToken = require('../middleware/check-auth');
const CarburantModel = require('../models/Carburant');

// setting router variable
const router = express.Router();


// add new Carburant
router.post('/add',  (req, res) => {

    let carburant = req.body;
    let new_type = new CarburantModel(carburant);
    

    new_type.save().then(result => {
        res.status(201).json({
            carburant: result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a Carburant
router.delete('/delete/:id', (req, res) => {

    let id = req.params.id;

    CarburantModel.findOne({ _id: id }).exec()
        .then(carburant => {
            if (!carburant) {
                res.status(404).json({
                    message: "Carburant Introuvable!"
                });
            }
            else {

                CarburantModel.deleteMany({ _id: id }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Carburant supprimé avec succés',
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

// get all Carburants
router.get('/list',  (req, res) => {

    CarburantModel.find(function (err, carburants) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json(carburants);
        }
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});



//  Defined update route
router.put('/update/:id', function (req, res) {
    let id = req.params.id;
    let carburant = req.body;
    CarburantModel.findOne({ _id: id }).exec()
        .then(doc => {
            if (!doc)
                res.status(404).json({
                    message: 'Could not load Document'
                });
            else {
                CarburantModel.updateOne({ _id: id }, carburant).exec()
                    .then(result => {
                        carburant = { _id: id, ...carburant }
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
router.get('/list/:id',  function (req, res) {
    let id = req.params.id;
    CarburantModel.findOne({_id: id},function(err, index) {
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
router.get('/list/getbyref/:ref',  function (req, res) {
    let ref = req.params.ref;
    CarburantModel.findOne({ref: ref},function(err, index) {
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