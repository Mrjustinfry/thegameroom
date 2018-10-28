'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

 
 //switch SW-####-####-####

const peopleSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: String,
    nintendo: String,
    playstation: String,
    xbox: String,
    platform: String,
});

/*
peopleSchema.pre('find', function (next) {
    this.populate('user');
    next();
});

peopleSchema.pre('findOne', function (next) {
    this.populate('user');
    next();
});
*/

peopleSchema.methods.serialize = function () {
    return {
        id: this._id,
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        email: this.email,
        nintendo: this.nintendo,
        playstation: this.playstation,
        xbox: this.xbox,
        platform: this.platform
    };
};

peopleSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

peopleSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

let People = mongoose.model('people', peopleSchema);

module.exports = { People };