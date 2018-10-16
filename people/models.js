'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

 
 //switch SW-####-####-####

const peopleSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    email: String,
    nintendo: String,
    playstation: String,
    xbox: String,
    platform: String,
});

peopleSchema.methods.serialize = function () {
    return {
        id: this._id,
        userName: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        nintendo: this.nintendo,
        playstation: this.playstation,
        xbox: this.xbox,
        platform: this.platform
    };
};

peopleSchema.methods.validatePassword = function (passWord) {
    return bcrypt.compare(passWord, this.passWord);
};

peopleSchema.statics.hashPassword = function (passWord) {
    return bcrypt.hash(passWord, 10);
};

const People = mongoose.model('people', peopleSchema);

module.exports = { People };