'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.Promise = global.Promise;

app.use(express.static('public'));


const { Posts, Users } = require('./models');
const { DATABASE_URL, PORT } = require('./config');


//GET request for hub
app.get('/hub', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users.map(user => {
                return {
                    userName: user.userName,
                    switch: user.switch,
                    playstation: user.playstation,
                    xbox: user.xbox,
                    platform: user.platform
                }
            }))
                .catch(err => {
                    console.log(err);
                    res.status({ message: "Internal Server Error" })
                })
        })
});

//POST request for hub
app.post('/signup', (req, res) => {
    const requiredInfo = ['firstName', 'lastName', 'userName', 'passWord'];
    requiredInfo.forEach(info => {
        if (!(info in req.body)) {
            const msg = `Missing ${info}`
            console.log(msg);
            res.send(msg)
        }
    });

    Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        passWord: req.body.passWord,
        switch: req.body.switch,
        playstation: req.body.playstation,
        xbox: req.body.xbox,
        platform: req.body.platform
    })

        .then(user => {
            res.status(201).json({
                id: user._id,
                userName: user.userName,
                switch: user.switch,
                playstation: user.playstation,
                xbox: user.xbox,
                platform: user.platform
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'something went wrong' });
        });
});



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