const express = require('express');
const verifyToken = require('../middleware/check-auth');
const SessionModel = require('../models/Session');
const pompisteModel = require('../models/Pompiste');

// setting router variable
const router = express.Router();

router.put('/closeSession', verifyToken, (req, res) => {
    SessionModel.updateOne({ state: 'Open' }, { $set: { state: 'Closed' } }).then(result => {
        res.status(200).json({
            result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// Update Session
router.put('/update/:id/:description', verifyToken, function (req, res) {
    let id = req.params.id;
    let description = req.params.description;
    console.log(description);
    SessionModel.updateOne({ _id: id }, { $set: { description: description } }).then(result => {
        res.status(200).json({
            result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

router.get('/get', verifyToken, (req, res) => {

    SessionModel.find({ state: 'Open' }).then(result => {
        res.status(200).json({
            result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});

// add pompiste to Session
router.put('/add-pompistes', verifyToken, (req, res) => {
    let id_session = req.body.idSession;
    let pompistes = req.body.pompistes;

    SessionModel.findOne({ _id: id_session }).lean().exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Session Introuvable'
                });
            }
            else {

                pompistes.forEach(pompiste => {

                    let find = false;
                    doc.personnes.forEach(p => {
                        if (pompiste.id_pompiste == p.id_pompiste) {
                            find = true;
                        }

                    });
                    if (!find) {
                        doc.personnes.push(pompiste);
                    }
                });

                let updated_session = new SessionModel(doc);

                SessionModel.updateOne({ _id: id_session }, updated_session).exec()
                    .then(result => {
                        res.status(200).json({
                            session: updated_session
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

// Open new session
router.post('/OpenNewSession', verifyToken, (req, res) => {

    let session = req.body;
    let newSession = new SessionModel(session);

    newSession.save().then(result => {
        res.status(201).json({
            session: result
        });
    })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
            console.log(err);
        });

});

// delete pompiste form Session
router.put('/delete-pompiste', verifyToken, (req, res) => {

    let id_session = req.body.idSession;
    let id_pompiste = req.body.idPompiste;

    SessionModel.findOne({
        _id: id_session
    }).lean().exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Session Introuvable'
                });
            } else {

                pompisteModel.findOne({ _id: id_pompiste }).exec()
                    .then(pompiste => {
                        if (!pompiste) {
                            res.status(404).json({
                                message: 'Pompiste Introuvable'
                            });
                        }
                        else {
                            doc.personnes = doc.personnes.filter(p => p.id_pompiste != id_pompiste);

                            let updated_session = new SessionModel(doc);

                            SessionModel.updateOne({
                                _id: id_session
                            }, updated_session).exec()
                                .then(result => {
                                    res.status(200).json({
                                        session: updated_session
                                    });
                                });
                        }
                    });

            }
        })
        .catch(err => {
            res.status(500).json({
                erreur: err
            });
        });
});


// get Pompiste for the current session
router.get('/get-session-pompiste/', (req, res) => {

    SessionModel.findOne({ state: 'Open' }).exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Session Introuvable'
                });
            }
            else {
                res.status(200).json({
                    pompistes: doc.personnes
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