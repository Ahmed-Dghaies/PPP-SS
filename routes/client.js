const express = require('express');
const verifyToken = require('../middleware/check-auth');
const ClientModel = require('../models/Client');

// setting router variable
const router = express.Router();


// add new client
router.post('/add', verifyToken, (req, res) => {

    let client = req.body.client;

    let new_client = new ClientModel(client);
    new_client.state = new_client.state.toLowerCase();
    new_client.region = new_client.region.toLowerCase();

    new_client.save().then(result => {
        res.status(201).json({
            client: result
        });
    })
    .catch(err => {
        res.status(500).json({
            erreur: err
        });
        console.log(err);
    });

});

// delete a client
router.delete('/delete/:id', (req, res) => {

    let id = req.params.id;

    ClientModel.findOne({_id: id}).exec()
    .then(client => {
        if(!client){
            res.status(404).json({
                message: "Client Introuvable!"
            });
        }
        else{

            ClientModel.deleteMany({_id: id}).exec()
            .then(result => {
                    res.status(200).json({
                        message: 'Client supprimé avec succés',
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

// get all clients
router.get('/list', (req, res) => {

    ClientModel.find().select('-__v').exec()
    .then(clients => {
        res.status(200).json({
            clients
        });
    })
    .catch(err => {
        res.status(500).json({
            erreur: err
        });
    });
});

// get clients by state 
router.get('/list/byState', (req, res) => {

    let state = req.query.state.toLowerCase();

    ClientModel.find({state}).exec()
    .then(clients => {
        res.status(200).json({
            clients
        });
    })
    .catch(err => {
        res.status(500).json({
            erreur: err
        });
    })

});


// get clients by region
router.get('/list/byRegion', (req, res) => {

    let region = req.query.region.toLowerCase();

    ClientModel.find({region}).exec()
    .then(clients => {
        res.status(200).json({
            clients
        });
    })
    .catch(err => {
        res.status(500).json({
            erreur: err
        });
    });
});

// update client
router.put('/update/:id', (req, res) => {

    let id = req.params.id;
    let client = req.body.client;

    client.state = client.state.toLowerCase();
    client.region = client.region.toLowerCase();

    ClientModel.findOne({_id: id}).exec()
    .then(doc => {
        if(!doc){
            res.status(404).json({
                message: 'Client Introuvable'
            });
        }
        else{
            ClientModel.updateOne({_id: id}, client).exec()
            .then(result => {
                client = {_id: id, ...client}
                res.status(200).json({
                    client
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

