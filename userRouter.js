'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Users } = require('./models');


//GET request for users
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users.map(user => {
                return {
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    nintendo: user.nintendo,
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

//GET request user by id
router.get('/:id', (req, res) => {
    Users
        .findById(req.params.id)
        .then(user => {
            res.json({
                id: user._id,
                userName: user.userName,
                email: user.email,
                nintendo: user.nintendo,
                playstation: user.playstation,
                xbox: user.xbox,
                platform: user.platform
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

//POST request for users
router.post('/', jsonParser, (req, res) => {
    const requiredInfo = ['firstName', 'lastName', 'userName', 'passWord', 'email'];
    for (let i = 0; i < requiredInfo.length; i++) {
        const info = requiredInfo[i];
        if (!(info in req.body)) {
            const msg = `missing ${info}`;
            console.log(msg);
            res.status(400).send(msg);
        }
    }
    Users.findOne({ userName: req.body.userName })
        .then(user => {
            if (user) {
                const message = `Username already taken`;
                console.error(message);
                return res.status(400).send(message);
            }
            else {
                Users.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    passWord: req.body.passWord,
                    email: req.body.email,
                    nintendo: req.body.nintendo,
                    playstation: req.body.playstation,
                    xbox: req.body.xbox,
                    platform: req.body.platform
                }).then(user => res.status(201).json(user.serialize()))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: 'something went wrong' });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'something went wrong' });
        });
});

//PUT request for users
router.put('/:id', jsonParser, (req, res) => {
    const requiredInfo = ["email", "nintendo","playstation", "xbox"];
    for (let i = 0; i < requiredInfo.length; i++) {
        const info = requiredInfo[i];
        if (!(info in req.body)) {
            const msg = `missing ${info} in request`;
            console.error(msg);
            return res.status(400).send(msg);
        }
    }
    if (req.params.id !== req.body.id) {
        const msg = `ID's do not match`;
        console.error(msg);
        return res.status(400).send(msg);
    }
    console.log(`Updating user info`);
    Users.update({
        id: req.params.id,
        email: req.body.email,
        nintendo: req.body.nintendo,
        playstation: req.body.playstation,
        xbox: req.body.xbox
    });
    res.status(204).end();
})

//DELETE request for users
router.delete('/:id', (req, res) => {
    Posts.remove({ user: req.params._id })
        .then(() => {
            User.findByIdAndRemove(req.params._id)
                .then(() => {
                    console.log(`Deleted posts for \`${req.params._id}\``)
                    res.status(204).json({ message: 'Success' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        })
})

module.exports = router;