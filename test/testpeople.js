'use strict';
global.DATABASE_URL = 'mongodb://justinfry:thinkful101@ds115753.mlab.com:15753/blog-test';
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { People } = require('../people');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/api/user', function () {
    const userName = 'exampleUser';
    const passWord = 'examplePass';
    const firstName = 'Example';
    const lastName = 'User';
    const userNameB = 'exampleUserB';
    const passWordB = 'examplePassB';
    const firstNameB = 'ExampleB';
    const lastNameB = 'UserB';

    before(function () {
        return runServer(DATABASE_URL);
    });

    after(function () {
        return closeServer();
    });

    beforeEach(function () { });

    afterEach(function () {
        return People.remove({});
    });

    describe('/api/users', function () {
        describe('POST', function () {
            it('Should reject users with missing username', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        passWord,
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal('Missing field');
                        expect(res.body.location).to.equal('userName');
                    });
            });
            it('Should reject users with missing password', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal('Missing field');
                        expect(res.body.location).to.equal('passWord');
                    });
            });
            it('Should reject users with non-string username', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName: 1234,
                        passWord,
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('userName');
                    });
            });
            it('Should reject users with non-string password', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord: 1234,
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('passWord');
                    });
            });
            it('Should reject users with non-string first name', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord,
                        firstName: 1234,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('firstName');
                    });
            });
            it('Should reject users with non-string last name', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord,
                        firstName,
                        lastName: 1234
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('lastName');
                    });
            });
            it('Should reject users with non-trimmed username', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName: ` ${userName} `,
                        passWord,
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Cannot start or end with whitespace'
                        );
                        expect(res.body.location).to.equal('userName');
                    });
            });
            it('Should reject users with non-trimmed password', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord: ` ${passWord} `,
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Cannot start or end with whitespace'
                        );
                        expect(res.body.location).to.equal('passWord');
                    });
            });
            it('Should reject users with empty username', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName: '',
                        passWord,
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at least 1 characters long'
                        );
                        expect(res.body.location).to.equal('userName');
                    });
            });
            it('Should reject users with password less than ten characters', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord: '123456789',
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at least 10 characters long'
                        );
                        expect(res.body.location).to.equal('passWord');
                    });
            });
            it('Should reject users with password greater than 72 characters', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord: new Array(73).fill('a').join(''),
                        firstName,
                        lastName
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at most 72 characters long'
                        );
                        expect(res.body.location).to.equal('passWord');
                    });
            });
            it('Should reject users with duplicate username', function () {
                return People.create({
                    userName,
                    passWord,
                    firstName,
                    lastName
                })
                    .then(() =>
                        chai.request(app).post('/api/users').send({
                            userName,
                            passWord,
                            firstName,
                            lastName
                        })
                    )
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Username already taken'
                        );
                        expect(res.body.location).to.equal('userName');
                    });
            });
            it('Should create a new user', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.keys(
                            'id',
                            'userName',
                            'firstName',
                            'lastName'
                        );
                        expect(res.body.userName).to.equal(userName);
                        expect(res.body.firstName).to.equal(firstName);
                        expect(res.body.lastName).to.equal(lastName);
                        return People.findOne({
                            userName
                        });
                    })
                    .then(user => {
                        expect(user).to.not.be.null;
                        expect(user.firstName).to.equal(firstName);
                        expect(user.lastName).to.equal(lastName);
                        return user.validatePassword(passWord);
                    })
                    .then(passwordIsCorrect => {
                        expect(passwordIsCorrect).to.be.true;
                    });
            });
            it('Should trim firstName and lastName', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        userName,
                        passWord,
                        firstName: ` ${firstName} `,
                        lastName: ` ${lastName} `
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.keys(
                            'userName',
                            'firstName',
                            'lastName'
                        );
                        expect(res.body.userName).to.equal(userName);
                        expect(res.body.firstName).to.equal(firstName);
                        expect(res.body.lastName).to.equal(lastName);
                        return People.findOne({
                            userName
                        });
                    })
                    .then(user => {
                        expect(user).to.not.be.null;
                        expect(user.firstName).to.equal(firstName);
                        expect(user.lastName).to.equal(lastName);
                    });
            });
        });

        describe('GET', function () {
            it('Should return an empty array initially', function () {
                return chai.request(app).get('/api/users').then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(0);
                });
            });
            it('Should return an array of users', function () {
                return People.create(
                    {
                        userName,
                        passWord,
                        firstName,
                        lastName
                    },
                    {
                        userName: userNameB,
                        passWord: passWordB,
                        firstName: firstNameB,
                        lastName: lastNameB
                    }
                )
                    .then(() => chai.request(app).get('/api/users'))
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array');
                        expect(res.body).to.have.length(2);
                        expect(res.body[0]).to.deep.equal({
                            userName,
                            firstName,
                            lastName
                        });
                        expect(res.body[1]).to.deep.equal({
                            userName: userNameB,
                            firstName: firstNameB,
                            lastName: lastNameB
                        });
                    });
            });
        });
    });
});

