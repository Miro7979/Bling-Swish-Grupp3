const crypto = require('crypto');
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo')(session);
const app = express();
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Notification = require('./models/Notification');
const Reset = require('./models/Reset')
const salt = 'grupp3BlingKathching'; // unique secret
const moment = require('moment');
const sendMail = require('./nodemailer');
const atob = require('atob');
const sse = require('easy-server-sent-events');
let btoa = require('btoa');

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
app.use(session({
    secret: salt, // a unique secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // true on htttps server
    store: new connectMongo({ mongooseConnection: mongoose.connection })
}));

// You can change the following options:
// endpoint: which endpoint you want to use
// script: at which route a clientside library should be served
// These are the default values (they will be set even if omitted):
const options = {
    endpoint: '/api/sse',
    script: '/sse.js'
};

// Calling the module returns an object with four properties:
// SSE:
//     the middleware - use with an express app
// send: 
//     a function that sends events from the server:
//     send(to, eventType, data)
// openSessions: 
//     a function returns how many sessions are open
// openConnections: 
//     a function that returns how man connections that are open
const { SSE, send, openSessions, openConnections } = sse(options);
app.use(SSE);



app.use(express.json()) // body parser
// connect our own acl middleware
const acl = require('./acl');
const aclRules = require('./acl-rules.json');
//app.use(acl(aclRules));
// just to get some rest routes going quickly
const theRest = require('the.rest');
const pathToModelFolder = path.join(__dirname, 'models');

app.post('/api/aktiverakonto*', async (req, res) => {
    try {
        let email = atob(req.body.encoded)
        let user = await User.findOne({ email })
        req.body.activated = false
        if (user) {
            user.activated = true;
            let age = moment().diff(user.nationalIdNumber.toString().slice(0, -4), 'years')
            let notChild = (age >= 18)
            notChild ? user.role = "parent" : user.role = "child"
            req.body.activated = true;
            await user.save()
            return
        }
        res.json(req.body);
    }
    catch (error) {
        req.json(error)
    }

})
app.post('/api/updatepassword*', async (req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.body.userId })
        let foundResetUser = await Reset.findOne({ _id: req.body.id });
        if (!foundResetUser) {
            res.json({ result: "Not welcome here" })
            return;
        }
        else if (foundUser && foundResetUser && Date.now() - foundResetUser.date < 86400000) {
            foundUser.password = encryptPassword(req.body.password)
            await foundUser.save();
            await foundResetUser.delete()
            res.json({ result: "Your password is updated!", ...foundUser })
        }
    }
    catch (e) {
        console.log(e)
    }
})


app.get('/nyttlosenord/:id', async (req, res) => {
    try {
        let foundResetUser = await Reset.findOne({ _id: req.params.id });
        if (foundResetUser && Date.now() - foundResetUser.date < 86400000) {
            res.json({ result: "Enter new password." })
            return
        }
        res.json({ result: "hej" })
        return
    }
    catch (e) {
        console.log(e)
    }
})
app.post('/api/resets', async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser) {
            res.json({ result: "Om din användare finns så har vi skickat ett mejl." })
            return
        }
        let foundResetUser = await Reset.findOne({ userId: foundUser._id });
        let time = Date.now()

        let reset = new Reset({
            date: Date.now(),
            userId: foundUser._id
        })
        if (foundResetUser) {
            if ((time - foundResetUser.date) > 86400000) {
                let savedReset = await reset.save()
                //send email
                let subject = "Återställningslänk"
                let text = "Klicka på länken för att återställa ditt lösenord"
                let html = `<a href='www.blingswish.se/nyttlosenord/${reset._id}'>Återställ lösenord<a>`
                let user = { email: foundUser.email, subject, text, html }
                sendMail(user)
                res.json({ result: "Om din användare finns så har vi skickat ett mejl till dig" })
                return;
            }
            else if (time < 86400000) {
                res.json({ success: 'Om din användare finns så har vi skickat ett mejl till dig.', resultFromSave, statusCode: 200 })
                return
            }
        }
        if (foundUser && !foundResetUser) {
            let savedReset = await reset.save();
            let subject = "Återställningslänk"
            let text = "Klicka på länken för att återställa ditt lösenord"
            let html = `<a href='www.blingswish.se/nyttlosenord/${reset._id}'>Återställ lösenord<a>`
            let user = { email: foundUser.email, resetId: reset._id, subject, text, html }
            sendMail(user)
            res.json("Om din användare finns så har vi skickat ett mejl till dig")
            return
        }
        res.json("Om din användare finns så har vi skickat ett mejl till dig")
        return;
    }
    catch (e) {
        console.log(e)
    }
})

// Set keys to names of rest routes
const models = {
    users: require('./models/User'),
    Transaction: require('./models/Transaction'),
    Notification: require('./models/Notification'),
    Reset: require('./models/Reset')
};


// create all necessary rest routes for the models
//new CreateRestRoutes(app, mongoose, models);

// route to create a user
// in production it would be STUPID to let
// the user/frontend set its role... but for now
// we should also check length of password etc.
app.post('/api/users', async (req, res) => {
    try {
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
        let mail = btoa(user.email)
        req.body.user = user;
        let subject = 'Aktiveringslänk Bling-swish ✔'
        let text = 'Aktiveringslänk'
        let html = `<a href='www.blingswish.se/aktiverakonto/${mail}'>Aktivera ditt konto</a>`
        let userMail = { email: user.email, subject, text, html }
        let error;
        let resultFromSave = await user.save()
            .catch(err => error = err + '');
        res.json(error ? { error } : { success: 'User created', resultFromSave, statusCode: 200 });
        !error && sendMail(userMail)
    }
    catch (error) {
        console.log(error)
    }
});

// route to login
app.post('/api/login*', async (req, res) => {
    try {
        let { email, password } = req.body;
        password = encryptPassword(password);
        let user = await User.findOne({ email, password }).exec();
        if (!user) {
            res.send("No user found baby!")
        }
        if (user) {
            user.password = 'Forget it!!!';
            req.session.user = user
        };
        res.json(user ? user : { error: 'not found 1' });
    }
    catch (e) {
        console.log(e)
    }
});

// check if/which user that is logged in
app.get('/api/login*', async (req, res) => {
    try {
        if (req.session.user) {
            let userdata = await User.find({ _id: req.session.user._id })
            req.session.user = userdata[0]
            res.json([req.session.user])
        } else {
            res.json([{ status: 'not logged in' }])
        }
    }
    catch (e) {
        console.log(e)
    }
});

// logout
app.delete('/api/login*', (req, res) => {
    try {
        delete req.session.user;
        res.json({ status: 'logged out' });
    }
    catch (e) {
        console.log(e)
    }
});

app.get('/api/mytransactions*', async (req, res) => {
    try {
        let user = req.session.user;
        if (!user) { res.json([]); return; }
        let iGot = await Transaction.find({ to: user._id });
        let iSent = await Transaction
            .find({ from: user._id })
            .map(x => ({ ...x, amount: -x.amount }));
        let allMyTransactions = iGot.concat(iSent);
        allMyTransactions.sort((a, b) => a.date < b.date ? -1 : 1);
        res.json(allMyTransactions);
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/api/imuser*', async (req, res) => {
    try {
        let user = req.session.user;
        if (!user) { res.json([]); return; }
        let imUser = await User.find({ _id: user._id });
        res.json(imUser);
    }
    catch (e) {
        console.log(e)
    }
})
app.post('/api/notifications*', async (req, res) => {
    try {
        let to = await User.findOne({ phone: req.body.to })
        let notification = new Notification({
            message: req.body.message,
            to: to._id,
            from: req.body.from
        });
        await notification.save()
        res.json(notification);
    }
    catch (e) {
        console.log(e)
    }
});

app.post('/api/transaction*', async (req, res) => {
    let to = await User.findOne({ phone: req.body.to })
    let transaction = new Transaction({
        balance: req.body.balance,
        message: req.body.message,
        amount: req.body.amount,
        to: to._id,
        from: req.body.from
    });

    await transaction.save()
    res.json(transaction);
});

app.get('/api/my-transactions/:userPhone', async (req, res) => {
    if (!req.session.user) {
        res.json('Nope!')
        return;
    }
    let err, allTransactions = await Transaction.find()
        .catch(
            error => err = error
        );
    let userPhone = req.params.userPhone;

    let thisUserTransactions = [];
    for (let transaction of allTransactions) {
        if (transaction.to.phone === userPhone || transaction.from.phone === userPhone) {
            thisUserTransactions.push(transaction);
        }
    };

    res.json(err || thisUserTransactions);
});


app.post('/api/send-sse', async (req, res) => {
    let body = req.body;
    res.json(body);
    sendNotification(req, body)
});

require('./modelRaw/UserRaw')
app.use(theRest(express, '/api', pathToModelFolder, null, {
    'login': 'Login',
    'aktiverakonto': "Aktiverakonto",
    'nyttlosenord': "Nyttlosenord",
    'updatepassword': 'Updatepassword'
}));

//app.use('/api/users', require('./routes/api/users'));

app.use(express.static('client/build'));

// start the web server
app.listen(3001, () => console.log('Listening on port 3001'));


// Example of using send(to, eventType, data)
// Here we send messages to all connected clients
// We randomly choose between the event types
// 'message' and 'other' (you can name your event types how you like)
// and send a message (an object with the properties cool and content)
async function sendNotification(req, body) {
    let { phoneNumber, message, fromUserId, cash } = body;

    send(
        req => req.session.user && req.session.user.phone === phoneNumber,
        'message',
        {
            message: message,
            content: 'This is a message sent ' + new Date().toLocaleTimeString() + ', from this phonenumber: ' + req.session.user.phone,
            fromUser: fromUserId,
            amount: cash
        }
    );

}