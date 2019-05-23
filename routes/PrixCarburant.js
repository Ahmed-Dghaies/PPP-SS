const express = require('express');
const verifyToken = require('../middleware/check-auth');
const PrixCarburantModel = require('../models/PrixCarburant');

// setting router variable
const router = express.Router();


// add new Carburant
router.post('/add', verifyToken, (req, res) => {

    let carburant = req.body;
    let new_type = new PrixCarburantModel(carburant);

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
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    PrixCarburantModel.findOne({ _id: id }).exec()
        .then(carburant => {
            if (!carburant) {
                res.status(404).json({
                    message: "Carburant Introuvable!"
                });
            }
            else {

                PrixCarburantModel.deleteMany({ _id: id }).exec()
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

    PrixCarburantModel.find(function (err, carburants) {
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

// Defined edit route
router.get('/edit/:id', verifyToken, function (req, res) {
    let id = req.params.id;
    PrixCarburantModel.findById(id, function (err, carburant) {
        res.json(carburant);
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
    let carburant = req.body;
    PrixCarburantModel.findOne({ _id: id }).exec()
        .then(doc => {
            if (!doc)
                res.status(404).json({
                    message: 'Could not load Document'
                });
            else {
                PrixCarburantModel.updateOne({ _id: id }, carburant).exec()
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

//  Defined indentifiant carburant update route
router.put('/updateList', verifyToken, function (req, res) {
    let carburants = req.body;
    for (i = 0; i < carburants.length; i++) {
        carburant = carburants[i];
        id = carburant._id;
        PrixCarburantModel.updateOne({ _id: id }, carburant).exec()
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

router.get('/getPrix/:carburant', verifyToken, function (req, res) {
    let carburant = req.params.carburant;
    PrixCarburantModel.findOne({carburant: carburant, identifiantPrix: 'P1'},function(err, index) {
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