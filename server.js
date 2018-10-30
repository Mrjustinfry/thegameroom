'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const app = express();
mongoose.Promise = global.Promise;


app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());

const { TEST_DATABASE_URL, PORT } = require('./config');


const postRouter = require('./postRouter');
const { router: peopleRouter } = require('./people');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', peopleRouter);
app.use('/posts', postRouter);
app.use('/api/auth/', authRouter);


const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
    return res.json({
        data: 'rosebud'
    });
});


app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(DB_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useMongoClient: true }, err => {
            if (err) {
                return reject(err);
            }
            server = app
                .listen(PORT, () => {
                    console.log(`Your app is listening on port ${PORT}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(TEST_DATABASE_URL).catch(err => console.error(err));
    console.log(TEST_DATABASE_URL);
}

module.exports = { app, runServer, closeServer };
