
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const db = "mongodb+srv://Manager:22b7284ab75c8861dfcee4bbf3918848@ppp-ss-authentication-nqw72.mongodb.net/PPP-SS-Auth?retryWrites=true"
const api = require('./routes/api')
const clientRouter = require('./routes/client'); 
const cardTypeRouter = require('./routes/CartBonType')
const app = express()

// setting server port 
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())


// connect to database
mongoose.connect(db ,{ useNewUrlParser: true }, err => {
    if (err) {
        console.error('error: ' + err)
    }
    else {
        console.log('connection established')
    }
})


app.get('/', function (req, res) {
    res.send('Hello from server')
})

// Authentication router
app.use('/api', api);

// client router
app.use('/client', clientRouter);

// card Type router
app.use('/cardType', cardTypeRouter)


app.listen(PORT, function () {
    console.log('Server running at localhost: ' + PORT)
})


