
'use strict';
global.DATABASE_URL = 'mongodb://justinfry:thinkful101@ds115753.mlab.com:15753/blog-test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { People } = require('../people');
const { JWT_SECRET } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth endpoints', function () {
    const userName = 'exampleUser';
    const passWord = 'examplePass';
    const firstName = 'Example';
    const lastName = 'User';

    before(function () {
        return runServer(DATABASE_URL);
    });

    after(function () {
        return closeServer();
    });

    beforeEach(function () {
        return People.hashPassword(passWord).then(passWord =>
            People.create({
                userName,
                passWord,
                firstName,
                lastName
            })
        );
    });

    afterEach(function () {
        return People.remove({});
    });

    describe('/api/auth/login', function () {
        it('Should reject requests with no credentials', function () {
            return chai
                .request(app)
                .post('/api/auth/login')
                .then(function (res) {
                    //expect.fail(null, null, 'Request should not succeed');

                    expect(res).to.have.status(400);
                }
                )/*
                .catch(err => {
                    console.log("error", err);
                   
                    expect.fail(null, null, 'Request should not succeed');                   
                });*/
        });
        it('Should reject requests with incorrect usernames', function () {
            return chai
                .request(app)
                .post('/api/auth/login')
                .send({ userName: 'wrongUsername', passWord })
                .then((res) =>
                    expect(res).to.have.status(401));
                    //expect.fail(null, null, 'Request should not succeed')
                /*
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });*/
        });
        it('Should reject requests with incorrect passwords', function () {
            return chai
                .request(app)
                .post('/api/auth/login')
                .send({ userName, passWord: 'wrongPassword' })
                .then((res) =>
                    expect(res).to.have.status(401));
                    //expect.fail(null, null, 'Request should not succeed')
                /*
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });*/
        });
        it('Should return a valid auth token', function () {
            return chai
                .request(app)
                .post('/api/auth/login')
                .send({ userName, passWord })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    const token = res.body.authToken;
                    expect(token).to.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    expect(payload.user).to.deep.equal({
                        userName,
                        firstName,
                        lastName
                    });
                });
        });
    });

    describe('/api/auth/refresh', function () {
        it('Should reject requests with no credentials', function () {
            return chai
                .request(app)
                .post('/api/auth/refresh')
                .then((res) =>
                    expect(res).to.have.status(401));
                    //expect.fail(null, null, 'Request should not succeed')
                /*
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });*/
        });
        it('Should reject requests with an invalid token', function () {
            const token = jwt.sign(
                {
                    userName,
                    firstName,
                    lastName
                },
                'wrongSecret',
                {
                    algorithm: 'HS256',
                    expiresIn: '7d'
                }
            );

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('Authorization', `Bearer ${token}`)
                .then((res) =>
                    expect(res).to.have.status(401));
                   // expect.fail(null, null, 'Request should not succeed')
                /*
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });*/
        });
        it('Should reject requests with an expired token', function () {
            const token = jwt.sign(
                {
                    user: {
                        userName,
                        firstName,
                        lastName
                    },
                    exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: userName
                }
            );

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('authorization', `Bearer ${token}`)
                .then((res) =>
                    expect(res).to.have.status(401));
                    //expect.fail(null, null, 'Request should not succeed')
                /*
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });*/
        });
        it('Should return a valid auth token with a newer expiry date', function () {
            const token = jwt.sign(
                {
                    user: {
                        userName,
                        firstName,
                        lastName
                    }
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: userName,
                    expiresIn: '7d'
                }
            );
            const decoded = jwt.decode(token);

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    const token = res.body.authToken;
                    expect(token).to.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    expect(payload.user).to.deep.equal({
                        userName,
                        firstName,
                        lastName
                    });
                    expect(payload.exp).to.be.at.least(decoded.exp);
                });
        });
    });
});
