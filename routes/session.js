const express = require('express');
const verifyToken = require('../middleware/check-auth');
const SessionModel = require('../models/Session');

// setting router variable
const router = express.Router();

router.get('/get', verifyToken, (req, res) => {

    SessionModel.find({state: 'Open'}).then(result => {
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

module.exports = router;