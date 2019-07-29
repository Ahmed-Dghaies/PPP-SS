const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const db = "mongodb+srv://Manager:22b7284ab75c8861dfcee4bbf3918848@ppp-ss-authentication-nqw72.mongodb.net/PPP-SS-Auth?retryWrites=true"
const api = require('./routes/api')
const clientRouter = require('./routes/client');
const cardTypeRouter = require('./routes/CartBonType');
const sessionRouter = require('./routes/session');
const app = express();
const cron = require('node-cron');
const createSession = require('./middleware/session');
const citerneRouter = require('./routes/citerne');
const recetteRouter = require('./routes/Recette');
const indexRouter = require('./routes/index');
const distributeurRouter = require('./routes/distributeur');
const prixcarburantRouter = require('./routes/PrixCarburant');
const pompisteRouter = require('./routes/pompiste');
const EventRouter = require('./routes/event');
const carburantRouter = require('./routes/carburant');
const carteBonRouter = require('./routes/recette-details/CardBon');
const bonValeurRouter = require('./routes/recette-details/BonValeur');
const chequeRouter = require('./routes/recette-details/Cheque');
const payementCreditRouter = require('./routes/recette-details/PayementCredit');
const stegEtAutreRouter = require('./routes/recette-details/StegEtAutre');
const creditRouter = require('./routes/Credit');
const bankRouter = require('./routes/bank');
const contreBonRouter = require('./routes/contreBon');
const especeRouter = require('./routes/recette-details/Espece');
const subventionPecheRouter = require('./routes/recette-details/SubventionPeche');

// setting server port 
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())


// connect to database
mongoose.connect(db, { useNewUrlParser: true }, err => {
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

// Session Router
app.use('/session', sessionRouter);

// client router
app.use('/client', clientRouter);

// card Type router
app.use('/cardType', cardTypeRouter)

// citerne router
app.use('/citerne', citerneRouter)

// recette router
app.use('/recette', recetteRouter)

// index router
app.use('/index', indexRouter)

// distributeur router
app.use('/distributeur', distributeurRouter)

// PrixCarburant router
app.use('/prixcarburant', prixcarburantRouter)

// pompiste router
app.use('/pompiste', pompisteRouter);

// event router
app.use('/event', EventRouter);

// Carburant router
app.use('/carburant', carburantRouter);

//carte Bon router
app.use('/carteBon', carteBonRouter);

//Bon Valeur router
app.use('/bonValeur', bonValeurRouter);

//Cheque router
app.use('/cheque', chequeRouter);

//Credit router
app.use('/credit', creditRouter);

//Payement credit router
app.use('/payementCredit', payementCreditRouter);

//Payement credit router
app.use('/stegEtAutre', stegEtAutreRouter);

//Bank router
app.use('/bank', bankRouter);

//Bank router
app.use('/contreBon', contreBonRouter);

//Espece router
app.use('/espece', especeRouter);

//Espece router
app.use('/subventionPeche', subventionPecheRouter);

cron.schedule('0 6 * * *', () => {
    createSession(1);
    console.log('here 1')
}, {
        scheduled: true,
        timezone: 'Africa/Algiers'
    });

cron.schedule('0 14 * * *', () => {
    createSession(2);
    console.log('here 2')
}, {
        scheduled: true,
        timezone: 'Africa/Algiers'
    });

cron.schedule('0 22 * * *', () => {
    createSession(3);
    console.log('here 3')
}, {
        scheduled: true,
        timezone: 'Africa/Algiers'
    });

app.listen(PORT, function () {
    console.log('Server running at localhost: ' + PORT)
})


