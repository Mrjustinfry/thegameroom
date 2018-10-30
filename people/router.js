
'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { People } = require('./models');
const { Posts } = require('../models');

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new user
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    const stringFields = ['username', 'password', 'firstName', 'lastName'];
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

    const explicityTrimmedFields = ['username', 'password'];
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
        username: {
            min: 1
        },
        password: {
            min: 3,
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




    let { username, password, firstName = '', lastName = '', email, playstation, nintendo, xbox, platform } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();

    return People.find({ username })
        .count()
        .then(count => {
            if (count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
            }
            return People.hashPassword(password);
        })
        .then(hash => {
            return People.create({
                username,
                password: hash,
                firstName,
                lastName,
                email,
                playstation,
                nintendo,
                xbox,
                platform
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

// Get request for users
router.get('/', (req, res) => {
    return People.find()
        .then(users => res.json(users.map(user => user.serialize())))
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
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
                username: user.username,
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


//PUT request for users
router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: `ID's do not match`
        });
    }

    const updated = {};
    const updateableInfo = ['firstName', 'lastName', 'username', 'password', 'email', 'nintendo', 'playstation', 'xbox', 'platform'];
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
    Posts.
        remove({ user: req.params.id })
        .then(() => {
            People.findByIdAndRemove(req.params.id)
                .then(() => {
                    console.log(`Deleted user ${req.params.id}`);
                    res.status(204).end();
                });
        });
});

module.exports = { router };