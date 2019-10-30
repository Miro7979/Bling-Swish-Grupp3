const crypto = require('crypto');
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo')(session);
const app = express();
const User = require('./models/User');
const Transaction = require('./models/Transaction')
const salt = 'grupp3BlingKathching'; // unique secret
const moment = require('moment')

function encryptPassword(password) {
    return crypto.createHmac('sha256', salt)
        .update(password).digest('hex');
}

// connect to db
mongoose.connect('mongodb://localhost/bling', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// connect middleware
app.use(express.json()) // body parser
app.use(session({
    secret: salt, // a unique secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // true on htttps server
    store: new connectMongo({ mongooseConnection: mongoose.connection })
}));
// connect our own acl middleware
const acl = require('./acl');
const aclRules = require('./acl-rules.json');
app.use(acl(aclRules));
// just to get some rest routes going quickly
const theRest = require('the.rest');
const pathToModelFolder = path.join(__dirname, 'models');
app.use(theRest(express, '/api', pathToModelFolder));

// route to create a user
// in production it would be STUPID to let
// the user/frontend set its role... but for now
// we should also check length of password etc.
app.post('/api/users', async (req, res) => {
    // we should check that the same username does
    // not exist... let's save that for letter
    if (
        typeof req.body.password !== 'string' ||
        req.body.password.length < 6
    ) {
        res.json({ error: 'Password to short' });
        return;
    }
  
    let user = new User({
        ...req.body,
        password: encryptPassword(req.body.password),
    });
    let error;
    let resultFromSave = await user.save()
        .catch(err => error = err + '');
    res.json(error ? { error } : { success: 'User created' });
});

// route to login
app.post('/api/login', async (req, res) => {
    let { name, password } = req.body;
    password = encryptPassword(password);
    let user = await User.findOne({ name, password })
        .select('name role').exec();
    if (user) { req.session.user = user };
    res.json(user ? user : { error: 'not found' });
});

// check if/which user that is logged in
app.get('/api/login', (req, res) => {
    res.json(req.session.user ?
        req.session.user :
        { status: 'not logged in' }
    );
});

// logout
app.delete('/api/login', (req, res) => {
    delete req.session.user;
    res.json({ status: 'logged out' });
});
app.get('/api/mytransactions',  async (req, res) => {
    let user = req.session.user;
    if(!user){ res.json([]); return; }
    let iGot = await Transaction.find({toUser: user._id});
    let iSent = await Transaction
      .find({fromUser: user._id})
      .map(x => ({...x, amount: -x.amount}));
    let allMyTransactions = iGot.concat(iSent);
    allMyTransactions.sort((a,b) => a.date < b.date ? -1 : 1);
    res.json(allMyTransactions);
  })
  app.get('/api/imuser',  async (req, res) => {
    let user = req.session.user;
    if(!user){ res.json([]); return; }
    let imUser = await User.find({_id: user._id});
    res.json(imUser);
  })


// start the web server
app.listen(3000, () => console.log('Listening on port 3000'));