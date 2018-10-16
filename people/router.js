
'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { People } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new user
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['userName', 'passWord'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    const stringFields = ['userName', 'passWord', 'firstName', 'lastName'];
    const nonStringField = stringFields.find(
        field => field in req.body && typeof req.body[field] !== 'string'
    );

    if (nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringField
        });
    }

    const explicityTrimmedFields = ['userName', 'passWord'];
    const nonTrimmedField = explicityTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
    );

    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

    const sizedFields = {
        userName: {
            min: 1
        },
        passWord: {
            min: 10,
            max: 72
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field =>
            'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
        field =>
            'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField
                ? `Must be at least ${sizedFields[tooSmallField]
                    .min} characters long`
                : `Must be at most ${sizedFields[tooLargeField]
                    .max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }

    let { userName, passWord, firstName = '', lastName = '' } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();

    return People.find({ userName })
        .count()
        .then(count => {
            if (count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'userName'
                });
            }
            return People.hashPassword(passWord);
        })
        .then(hash => {
            return People.create({
                userName,
                passWord: hash,
                firstName,
                lastName
            });
        })
        .then(user => {
            return res.status(201).json(user.serialize());
        })
        .catch(err => {
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({ code: 500, message: 'Internal server error' });
        });
});


router.get('/', (req, res) => {
    return People.find()
        .then(users => res.json(users.map(user => user.serialize())))
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//GET request for users
router.get('/', (req, res) => {
    People.find()
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
    People
        .findById(req.params.id)
        .then(user => {
            res.json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
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


/*
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
    People.findOne({ userName: req.body.userName })
        .then(user => {
            if (user) {
                const message = `Username already taken`;
                console.error(message);
                return res.status(400).send(message);
            }
            else {
                People.create({
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
*/


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

    People
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedUser => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

//DELETE request for users
router.delete('/:id', (req, res) => {
    People.findOneAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted user ${req.params.id}`);
            res.status(204).end();
        });
});

module.exports = { router };