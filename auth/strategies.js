
'use strict';
const { Strategy: LocalStrategy } = require('passport-local');

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { People } = require('../people/models');
const { JWT_SECRET } = require('../config');

const localStrategy = new LocalStrategy((userName, passWord, callback) => {
    let user;
    People.findOne({ userName: userName })
        .then(_user => {
            user = _user;
            if (!user) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return user.validatePassword(passWord);
        })
        .then(isValid => {
            if (!isValid) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return callback(null, user);
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return callback(null, false, err);
            }
            return callback(err, false);
        });
});

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);

module.exports = { localStrategy, jwtStrategy };
