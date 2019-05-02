const express = require('express');
const verifyToken = require('../middleware/check-auth');
const indexModel = require('../models/index');

// setting router variable
const router = express.Router();


// add new Type
router.post('/add', verifyToken, (req, res) => {

    let index = req.body;
    let new_index = new indexModel(index);

    new_index.save().then(result => {
        res.status(201).json({
            index: result
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

    indexModel.findOne({ _id: id }).exec()
        .then(index => {
            if (!index) {
                res.status(404).json({
                    message: "index Introuvable!"
                });
            }
            else {

                indexModel.deleteMany({ _id: id }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'index supprimé avec succés',
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

    indexModel.find(function (err, indexs){
        if(err){
          console.log(err);
        }
        else {
          res.status(200).json(indexs);
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
    indexModel.findById(id, function (err, index) {
        res.json(index);
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
    let index = req.body;
    console.log(id)
    console.log(index)
    indexModel.findOne({_id: id}).exec()
    .then(doc => {
        if (!doc)
        res.status(404).json({
            message: 'Could not load Document'
        });
        else {
            indexModel.updateOne({_id: id}, index).exec()
            .then(result => {
                index = {_id: id, ...index}
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