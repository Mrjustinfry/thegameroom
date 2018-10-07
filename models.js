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

//switch SW-####-####-####

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    email: { type: String, required: true },
    nintendo: String,
    playstation: String,
    xbox: String,
    platform: String,
})

userSchema.methods.serialize = function () {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        passWord: this.passWord,
        email: this.email,
        nintendo: this.nintendo,
        playstation: this.playstation,
        xbox: this.xbox,
        platform: this.platform
    }
}


const Posts = mongoose.model('posts', postSchema);
const Users = mongoose.model('users', userSchema);

module.exports = { Users, Posts };
