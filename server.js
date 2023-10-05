const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const { logError, returnError } = require('./middleware/errorHandler');

const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
dotenv.config();
const port = process.env.PORT;

// basic express session initialization
app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    // init passport on every route call
    .use(passport.initialize())
    // allow passport to use "express-session"
    .use(passport.session());

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callback: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'))
    .use(logError)
    .use(returnError);


app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, db) => {
    try {
        app.listen(port, () => {console.log('Db is listening and Node running on port ' + port)});
    }
    catch (err){
        console.log(err);
    }
});