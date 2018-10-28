'use strict';

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const ObjectID = require('mongodb').ObjectID;

const { Posts } = require("./models");
const { People } = require('./people/models');

//GET request for posts
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.json(posts.map(post => {
                return {
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    user: post.user ? post.user.username: 'unknown',
                    date: post.date,
                    comments: post.comments
                }
            }
            ))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' })
        })
});

//GET request for post by id
router.get('/:id', (req, res) => {
    Posts
        .findById(req.params.id)
        .then(post => {
            res.json({
                id: post._id,
                title: post.title,
                content: post.content,
                user: post.user ? post.user.username : 'unknown',
                comments: post.comments,
                date: post.date
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

/*
//Get post by user_id
router.get('/:user_id', (req, res) => {
    Posts
        .findById(req.params.user_id)
        .then(post => {
            res.json({
                id: post._id,
                title: post.title,
                content: post.content,
                user: post.user ? post.user.username : 'unknown',
                comments: post.comments,
                date: post.date
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        })
})
*/

//Post for posts
router.post('/', (req, res) => {
    const requiredFields = ['title', 'content', 'user_id'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    People
        .findById(req.body.user_id)
        .then(user => {
            if (user) {
                Posts
                    .create({
                        title: req.body.title,
                        content: req.body.content,
                        user: ObjectID(req.body.user_id),
                        date: req.body.date
                    })
                    .then(post => res.status(201).json({
                        id: post.id,
                        user:  user.username,
                        content: post.content,
                        title: post.title,
                        date: post.date,
                        comments: post.comments
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: 'Something went wrong' });
                    });
            }
            else {
                const message = `User not found`;
                console.error(message);
                return res.status(400).send(message);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong' });
        });
});


/*
//POST request for posts
router.post('/', jsonParser, (req, res) => {
    const requiredInfo = ['title', 'content'];
    for (let i = 0; i < requiredInfo.length; i++) {
        const info = requiredInfo[i];
        if (!(info in req.body)) {
            const msg = `missing ${info}`;
            console.log(msg);
            res.status(400).send(msg);
        }
    }
    Posts.create({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    }).then(post => res.status(201).json(post.serialize()))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'something went wrong' });
        })
});
*/

//PUT request for posts
router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: `ID's do not match`
        });
    }

    const updated = {};
    const updateableInfo = ['title', 'content'];
    updateableInfo.forEach(info => {
        if (info in req.body) {
            updated[info] = req.body[info];
        }
    });

    Posts
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedPost => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

//DELETE request for posts
router.delete('/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted post ${req.params.id}`);
            res.status(204).end();
        });
});


module.exports = router;