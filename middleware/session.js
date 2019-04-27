const SessionModel = require('../models/Session');


const createSession = (number) => {
    var datetime = new Date();
    var date = datetime.toISOString().slice(0, 10);
    if (number === 1) {
        poste = 'P1';
        description = 'Poste de 06H à 14H';
        SessionModel.updateOne({ state: 'Open' }, { $set: { state: 'Closed' } }, function (err, res) {
            if (err) { throw err; }
            if (res) { console.log('updated'); }
        });
        var sessionModel = new SessionModel({ date: date, poste: poste, description: description, state: 'Open' });
        sessionModel.save();
    }
    else if (number === 2) {
        var poste = 'P2';
        description = 'Poste de 14H à 22H';
        SessionModel.updateOne({ state: 'Open' }, { $set: { state: 'Closed' } }, function (err, res) {
            if (err) { throw err; }
            if (res) { console.log('updated'); }
        });
        var sessionModel = new SessionModel({ date: date, poste: poste, description: description, state: 'Open' });
        sessionModel.save();
    }
    else if (number === 3) {
        var poste = 'P3';
        description = 'Poste de 22H à 06H du matin';
        SessionModel.updateOne({ state: 'Open' }, { $set: { state: 'Closed' } }, function (err, res) {
            if (err) { throw err; }
            if (res) { console.log('updated'); }
        });
        var sessionModel = new SessionModel({ date: date, poste: poste, description: description, state: 'Open' });
        sessionModel.save();
    }
}

module.exports = createSession;