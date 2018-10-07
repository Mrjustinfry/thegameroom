'use strict';

const express = require("express");
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Posts } = require("./models");


//GET request for posts
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.json(posts.map(post => {
                return {
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    userName: post.userName,
                    date: post.date
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
                date: post.date
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

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

//PUT request for posts
router.put('/:id', jsonParser, (req, res) => {
    const requiredInfo = ["title", "content", "date"];
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
    console.log(`Updating post`);
    const updatedPost =
        Posts.update({
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            date: req.body.date
        });
    res.status(204).end();
});

//DELETE request for posts
router.delete('/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id);
    console.log(`Deleted post ${req.params.id}`);
    res.status(204).end();
});


module.exports = router;