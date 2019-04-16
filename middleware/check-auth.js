const jwt = require('jsonwebtoken');



const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unothorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unothorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload) {
        return res.status(401).send('Unothorized request')
    }
    req.userId = payload.subject
    next()
}

module.exports = verifyToken;