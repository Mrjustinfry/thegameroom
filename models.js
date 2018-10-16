'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({ content: String });

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: [commentSchema]
})

postSchema.methods.serialize = function () {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        date: this.date
    };
};




const Posts = mongoose.model('posts', postSchema)

module.exports = { Posts };
