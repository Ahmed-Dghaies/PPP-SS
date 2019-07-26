const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const EspeceModel = require('../../models/Espece');

// setting router variable
const router = express.Router();


// add new Espece
router.post('/add', verifyToken, (req, res) => {

    let espece = req.body.espece;

    let new_espece = new EspeceModel(espece);

    new_espece.save().then(result => {
            res.status(201).json({
                espece: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a Espece
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    EspeceModel.findOne({
            _id: id
        }).exec()
        .then(espece => {
            if (!espece) {
                res.status(404).json({
                    message: "recette espece Introuvable!"
                });
            } else {

                EspeceModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Recette espece supprimé avec succés',
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

// get all Especes
router.get('/list', verifyToken, (req, res) => {

    EspeceModel.find().select('-__v').exec()
        .then(especes => {
            res.status(200).json({
                especes
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update Espece
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let espece = req.body.espece;


    EspeceModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Espece Introuvable'
                });
            } else {
                EspeceModel.updateOne({
                        _id: id
                    }, espece).exec()
                    .then(result => {
                        espece = {
                            _id: id,
                            ...espece
                        }
                        res.status(200).json({
                            espece
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