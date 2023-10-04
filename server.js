const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const { logError, returnError } = require('./middleware/errorHandler');
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const cors = require('cors');

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.json())
// basic express session initialization
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    // init passport on every route call
    .use(passport.initialize())
    // allow passport to use "express-session"
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'))
    .use(logError)
    .use(returnError);

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