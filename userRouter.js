/*
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
                    firstName: user.firstName,
                    lastName: user.lastName,
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
                    res.status(500).json({ error: "Internal Server Error" });
                });
        });
});

//GET request user by id
router.get('/:id', (req, res) => {
    Users
        .findById(req.params.id)
        .then(user => {
            res.json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                passWord: user.passWord,
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
router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: `ID's do not match`
        });
    }

    const updated = {};
    const updateableInfo = ['firstName', 'lastName', 'userName', 'passWord', 'email', 'nintendo', 'playstation', 'xbox', 'platform'];
    updateableInfo.forEach(info => {
        if (info in req.body) {
            updated[info] = req.body[info];
        }
    });

    Users
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedUser => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

//DELETE request for users
router.delete('/:id', (req, res) => {
    Users.findOneAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted user ${req.params.id}`);
            res.status(204).end();
        });
});

module.exports = router;
*/