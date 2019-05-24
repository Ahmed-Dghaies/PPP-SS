const express = require('express');
const verifyToken = require('../middleware/check-auth');
const EventModel = require('../models/Event');

// setting router variable
const router = express.Router();


// add new event
router.post('/add', verifyToken, (req, res) => {

    let event = req.body.event;

    let new_event = new EventModel(event);

    new_event.save().then(result => {
            res.status(201).json({
                event: result
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete a evetn
router.delete('/delete/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    EventModel.findOne({
            _id: id
        }).exec()
        .then(event => {
            if (!event) {
                res.status(404).json({
                    message: "event Introuvable!"
                });
            } else {

                EventModel.deleteMany({
                        _id: id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Event supprimé avec succés',
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

// get all events
router.get('/list', verifyToken, (req, res) => {

    EventModel.find().select('-__v').exec()
        .then(events => {
            res.status(200).json({
                events
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// get events by date 
router.get('/list/byDate', verifyToken, (req, res) => {

    let date = req.query.date;

    EventModel.find({
            date
        }).exec()
        .then(events => {
            res.status(200).json({
                events
            });
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        })

});



// update event
router.put('/update/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let event = req.body.event;

    EventModel.findOne({
            _id: id
        }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'event Introuvable'
                });
            } else {
                EventModel.updateOne({
                        _id: id
                    }, event).exec()
                    .then(result => {
                        event = {
                            _id: id,
                            ...event
                        }
                        res.status(200).json({
                            event
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