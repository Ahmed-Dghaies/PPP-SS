const express = require('express');
const verifyToken = require('../../middleware/check-auth');
const StegEtAutreModel = require('../../models/StegEtAutre');

// setting router variable
const router = express.Router();


// add new steg Et Autres bon
router.post('/add', verifyToken, (req, res) => {

    let stegEtAutre = req.body.stegEtAutre;

    let new_stegEtAutre = new StegEtAutreModel(stegEtAutre);

    new_stegEtAutre.save().then(result => {
            res.status(201).json({
                stegEtAutre: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a steg Et Autres bon
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    StegEtAutreModel.findOne({
            _id: id
        }).exec()
        .then(stegEtAutre => {
            if (!stegEtAutre) {
                res.status(404).json({
                    message: "Bon Introuvable!"
                });
            } else {

                StegEtAutreModel.deleteMany({
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

// get all steg Et Autres bon
router.get('/list', verifyToken, (req, res) => {

    StegEtAutreModel.find().select('-__v').exec()
        .then(stegEtAutres => {
            res.status(200).json({
                stegEtAutres
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// update steg Et Autres bon
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let stegEtAutre = req.body.stegEtAutre;


    StegEtAutreModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'stegEtAutre Introuvable'
                });
            } else {
                StegEtAutreModel.updateOne({
                        _id: id
                    }, stegEtAutre).exec()
                    .then(result => {
                        stegEtAutre = {
                            _id: id,
                            ...stegEtAutre
                        }
                        res.status(200).json({
                            stegEtAutre
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