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
//app.use(acl(aclRules));
// just to get some rest routes going quickly
const theRest = require('the.rest');
const pathToModelFolder = path.join(__dirname, 'models');

app.get('/api/activateaccounts/:encoded', async (req, res) => {
    let email = atob(req.params.encoded)
    let user = await User.findOne({ email })
    console.log("email", email);
    console.log("user", user)
    if (user) {
        user.activated = true;
        let age = moment().diff(user.nationalIdNumber.toString().slice(0, -4), 'years')
        let notChild = (age >= 18)
        notChild ? user.role = "parent" : user.role = "child"
        await user.save()
    }
    console.log("user save", user)
    res.json(!user ? '<h1>fel</h1>' : '<h1>activated</h1>');

})
app.post('/api/updatepassword*', async (req,res) => {
    let foundUser = await User.findOne({email: req.body.email})
    console.log(req.body)
    let foundResetUser = await Reset.findOne({_id: req.body.resetCode});
    if(!foundResetUser){
        res.json({result: "Not welcome here"})
        return;
    }
    else if(foundResetUser && Date.now() - foundResetUser.date < 86400000) {
        foundUser.password = req.body.newPassword
        await foundUser.save();
        res.json({result: "Your password is updated!"})
    }
    


})



app.get('/api/nyttlosenord/:id', async (req, res) => {
    console.log(req.params.id)
    let foundResetUser = await Reset.findOne({_id: req.params.id});
    if(foundResetUser && Date.now() - foundResetUser.date < 86400000) {
        console.log("hej")
        res.json({result: "Enter new password."})
    }
    res.json({result:"hej"})
    return
})
app.post('/api/resets', async (req, res) => {
    let foundUser = await User.findOne({email: req.body.email})
    if(!foundUser){
        res.json({result: "Om din användare finns så har vi skickat ett mejl."})
        return
    }
    let foundResetUser = await Reset.findOne({userId:foundUser._id});
    let time =  Date.now()

    let reset = new Reset({
        date: Date.now(),
        userId: foundUser._id 
    })
    if(foundResetUser){
        if((time - foundResetUser.date) > 86400000 ){
            console.log('här?')
            let savedReset = await reset.save()
            //send email
            res.json({result: "Om din användare finns så har vi skickat ett mejl till dig"})
            return;
        }
        else if(time < 86400000){
            console.log("under 24")
            res.json( {success: 'Om din användare finns så har vi skickat ett mejl till dig.', resultFromSave, statusCode: 200})
            return
        }
    }
    if(foundUser && !foundResetUser){
        console.log("hittade user men inte reset")
        let savedReset = await reset.save();
        res.json("Om din användare finns så har vi skickat ett mejl till dig")
        return
    }
    res.json("Om din användare finns så har vi skickat ett mejl till dig")  
    return; 
})


//http://localhost:3000/api/activateaccounts/ZGFudGlzZW44OUBnbWFpbC5jb20
//what to do with this?????
// app.all('/api/*', (req,res) => {
//     res.json({url: req.url, ok: true});
//   });

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
    res.json(error ? { error } : { success: 'User created', resultFromSave, statusCode: 200 });
    //!error && sendMail(user)
});

// route to login
app.post('/api/login*', async (req, res) => {
    let { email, password } = req.body;
    console.log(email, password)
    //password = encryptPassword(password);
    let user = await User.findOne({ email, password }).exec();
    if (!user) {
        res.send("No user found baby!")
        return;
    }
    if (user) {
        user.password = 'Forget it!!!';
        req.session.user = user
        res.json({result: "Yo you are logged in!"})
        return;
    };
    res.json(user ? user : { error: 'not found 1' });
    return;
});

// check if/which user that is logged in
app.get('/api/login*', (req, res) => {
    res.json(req.session.user ?
        [req.session.user] :
        [{ status: 'not logged in' }]
    );
    return;
});

// logout
app.delete('/api/login*', (req, res) => {
    delete req.session.user;
    res.json({ status: 'logged out' });
    return;
});

app.get('/api/mytransactions*', async (req, res) => {
    let user = req.session.user;
    if (!user) { res.json([]); return; }
    let iGot = await Transaction.find({ toUser: user._id });
    let iSent = await Transaction
        .find({ fromUser: user._id })
        .map(x => ({ ...x, amount: -x.amount }));
    let allMyTransactions = iGot.concat(iSent);
    allMyTransactions.sort((a, b) => a.date < b.date ? -1 : 1);
    res.json(allMyTransactions);
    return;
})

app.get('/api/imuser*', async (req, res) => {
    let user = req.session.user;
    if (!user) { res.json([]); return; }
    let imUser = await User.find({ _id: user._id });
    res.json(imUser);
})
app.post('/api/notifications*', async (req, res) => {
    let user = await User.findOne({phone: req.body.toUser })
    let notification = await new Notification({
        message: req.body.message,
        user
    });
    await notification.save()
    res.json( notification);
    return;
});

app.use(theRest(express, '/api', pathToModelFolder, null, {
    'login': 'Login',
    'updatepassword': 'Updatepassword'
}));

//app.use('/api/users', require('./routes/api/users'));


// start the web server
app.listen(3001, () => console.log('Listening on port 3001'));