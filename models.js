'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

mongoose.Promise = global.Promise;

const { People } = require('./people/models');

const commentSchema = mongoose.Schema({ comment: String, user: { type: mongoose.Schema.Types.ObjectId, ref: 'people' } });

const today = () => {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let year = today.getFullYear();
    if (day < 10) {
        day = '0' + day
    } if (month < 10) {
        month = '0' + month
    }
    today = year + '-' + month + '-' + day;
    return today;
}

const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'people' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, default: today },
    comments: [commentSchema]
})

postSchema.pre('find', function (next) {
    this.populate('user');
    next();
});

postSchema.pre('findById', function (next) {
    this.populate('user');
    next();
});

postSchema.virtual('name').get(function () {
    return `${People.username}`;
});

postSchema.methods.serialize = function () {
    return {
        id: this._id,
        user: this.name,
        title: this.title,
        content: this.content,
        date: this.date
    };
};


const Posts = mongoose.model('posts', postSchema)

module.exports = { Posts };
