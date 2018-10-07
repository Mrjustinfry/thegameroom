'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());

const { Posts, Users } = require('./models');
const { DATABASE_URL, PORT } = require('./config');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

app.use('/users', userRouter);
app.use('/posts', postRouter);




let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            databaseUrl,
            err => {
                if (err) {
                    return reject(err);
                }
                server = app
                    .listen(port, () => {
                        console.log(`Your app is listening on port ${port}`);
                        resolve();
                    })
                    .on("error", err => {
                        mongoose.disconnect();
                        reject(err);
                    });
            }
        );
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing Server');
            server.close(err => {
                if (err) {
                    {
                        return reject(err);
                    }
                    resolve();
                }
            })
        })
    })
}



if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = app;