'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, content: String });

const postSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, 
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: [commentSchema]
})

/*
 * Post.findOne({_id: 123})
.populate('postedBy')
.exec(function(err, post) {
    // do stuff with post
});
*/

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
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    passWord: String,
    email: String,
   // picture: String,
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
       // picture: this.picture,
        nintendo: this.nintendo,
        playstation: this.playstation,
        xbox: this.xbox,
        platform: this.platform
    }
}


const Posts = mongoose.model('posts', postSchema);
const Users = mongoose.model('users', userSchema);

module.exports = { Users, Posts };
