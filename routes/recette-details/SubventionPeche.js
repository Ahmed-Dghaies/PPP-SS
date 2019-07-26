const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const SubventionPecheModel = require('../../models/SubventionPeche');

// setting router variable
const router = express.Router();


// add new subvention peche bon
router.post('/add', verifyToken, (req, res) => {

    let subventionPeche = req.body.subventionPeche;

    let new_subventionPeche = new SubventionPecheModel(subventionPeche);

    new_subventionPeche.save().then(result => {
            res.status(201).json({
                subventionPeche: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a subvention peche bon
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    SubventionPecheModel.findOne({
            _id: id
        }).exec()
        .then(subventionPeche => {
            if (!subventionPeche) {
                res.status(404).json({
                    message: "Bon Introuvable!"
                });
            } else {

                SubventionPecheModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'bon supprimé avec succés',
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

// get all subvention peche bon
router.get('/list', verifyToken, (req, res) => {

    SubventionPecheModel.find().select('-__v').exec()
        .then(subventionPeches => {
            res.status(200).json({
                subventionPeches
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update subvention peche bon
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let subventionPeche = req.body.subventionPeche;


    SubventionPecheModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'subventionPeche Introuvable'
                });
            } else {
                SubventionPecheModel.updateOne({
                        _id: id
                    }, subventionPeche).exec()
                    .then(result => {
                        subventionPeche = {
                            _id: id,
                            ...subventionPeche
                        }
                        res.status(200).json({
                            subventionPeche
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