'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { People } = require('../people');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/api/user', function () {
    const username = 'exampleUser';
    const password = 'examplePass';
    const firstName = 'Example';
    const lastName = 'User';
    const email = "example@email.com";
    const nintendo = "SW-1212-1212-1212";
    const playstation = "example";
    const xbox = "example";
    const platform = "example";

    const usernameB = 'exampleUserB';
    const passwordB = 'examplePassB';
    const firstNameB = 'ExampleB';
    const lastNameB = 'UserB';
    const emailB = "exampleB@email.com";
    const nintendoB = "SW-1212-1212-1111";
    const playstationB = "exampleB";
    const xboxB = "exampleB";
    const platformB = "exampleB";

    before(function () {
        return runServer(TEST_DATABASE_URL);
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
                        password,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal('Missing field');
                        expect(res.body.location).to.equal('username');
                    });
            });
            it('Should reject users with missing password', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal('Missing field');
                        expect(res.body.location).to.equal('password');
                    })
            });
            it('Should reject users with non-string username', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username: 1234,
                        password,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('username');
                    })
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
                        expect(res.body.location).to.equal('username');
                    });
            });
            it('Should reject users with non-string password', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        password: 1234,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('password');
                    })
            });
            it('Should reject users with non-string first name', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        password,
                        firstName: 1234,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('firstName');
                    })
            });
            it('Should reject users with non-string last name', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        password,
                        firstName,
                        lastName: 1234
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('lastName');
                    })
            });
            it('Should reject users with non-trimmed username', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username: ` ${username} `,
                        password,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Cannot start or end with whitespace'
                        );
                        expect(res.body.location).to.equal('username');
                    })
            });
            it('Should reject users with non-trimmed password', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        password: ` ${password} `,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Cannot start or end with whitespace'
                        );
                        expect(res.body.location).to.equal('password');
                    })
            });
            it('Should reject users with empty username', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username: '',
                        password,
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at least 1 characters long'
                        );
                        expect(res.body.location).to.equal('username');
                    })
            });
            it('Should reject users with password less than ten characters', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        password: '123456789',
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at least 10 characters long'
                        );
                        expect(res.body.location).to.equal('password');
                    })
            });
            it('Should reject users with password greater than 72 characters', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        password: new Array(73).fill('a').join(''),
                        firstName,
                        lastName
                    })
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at most 72 characters long'
                        );
                        expect(res.body.location).to.equal('password');
                    })
            });
            it('Should reject users with duplicate username', function () {
                return People.create({
                    username,
                    password,
                    firstName,
                    lastName
                })
                    .then(() =>
                        chai.request(app).post('/api/users').send({
                            username,
                            password,
                            firstName,
                            lastName
                        })
                    )
                    .then(res => {
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Username already taken'
                        );
                        expect(res.body.location).to.equal('username');
                    })
            });
            it('Should create a new user', function () {
                return chai
                    .request(app)
                    .post('/api/users')
                    .send({
                        username,
                        password,
                        firstName,
                        lastName,
                        email,
                        playstation,
                        nintendo,
                        xbox,
                        platform
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.keys(
                            'id',
                            'username',
                            'firstName',
                            'lastName',
                            'email',
                            'playstation',
                            'nintendo',
                            'xbox',
                            'platform'

                        );
                        expect(res.body.username).to.equal(username);
                        expect(res.body.firstName).to.equal(firstName);
                        expect(res.body.lastName).to.equal(lastName);
                        expect(res.body.email).to.equal(email);
                        expect(res.body.playstation).to.equal(playstation);
                        expect(res.body.nintendo).to.equal(nintendo);
                        expect(res.body.xbox).to.equal(xbox);
                        expect(res.body.platform).to.equal(platform);
                        return People.findOne({
                            username
                        });
                    })
                    .then(user => {
                        expect(user).to.not.be.null;
                        expect(user.firstName).to.equal(firstName);
                        expect(user.lastName).to.equal(lastName);
                        return user.validatePassword(password);
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
                        username,
                        password,
                        firstName: ` ${firstName} `,
                        lastName: ` ${lastName} `
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.keys(
                            'id',
                            'username',
                            'firstName',
                            'lastName'
                        );
                        expect(res.body.username).to.equal(username);
                        expect(res.body.firstName).to.equal(firstName);
                        expect(res.body.lastName).to.equal(lastName);
                        return People.findOne({
                            username
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
                        username,
                        password,
                        firstName,
                        lastName,
                        email,
                        playstation,
                        nintendo,
                        xbox,
                        platform
                    },
                    {
                        username: usernameB,
                        password: passwordB,
                        firstName: firstNameB,
                        lastName: lastNameB,
                        email: emailB,
                        playstation: playstationB,
                        nintendo: nintendoB,
                        xbox: xboxB,
                        platform: platformB
                    }
                )
                    .then(() => chai.request(app).get('/api/users'))
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array');
                        expect(res.body).to.have.length(2);
                        const userA = res.body.find(user => user.username === username);
                        const userB = res.body.find(user => user.username === usernameB);
                        expect(userA).to.deep.equal({
                            username,
                            firstName,
                            lastName,
                            email,
                            playstation,
                            nintendo,
                            xbox,
                            platform,
                            id: userA.id
                        });
                        expect(userB).to.deep.equal({
                            id: userB.id,
                            username: usernameB,
                            firstName: firstNameB,
                            lastName: lastNameB,
                            email: emailB,
                            playstation: playstationB,
                            nintendo: nintendoB,
                            xbox: xboxB,
                            platform: platformB
                        });
                    });
            });
        });

        
        describe('Put requests for users', function () {
            it('should update user data by id', function () {

                const theUser = {
                    firstName: "john",
                    lastName: "doe",
                    username: "DanceOnAir",
                    password: "johndoe",
                    email: "example@example.com",
                    nintendo: "SW-1234-5678-9091",
                    playstation: "johnny",
                    xbox: "john",
                    platform: "nintendo"
                };

                const updatedUser = {
                    firstName: "Fred",
                    lastName: "Astaire",
                    username: "DanceOnAir",
                    password: "GingerRogers",
                    email: "TwoStep@dance.com",
                    nintendo: "SW-1234-5678-9098",
                    playstation: "Freddie",
                    xbox: "fred",
                    platform: "playstation"
                };
                return People
                    .create(theUser);

                return People
                    .findOne()
                    .then(user => {
                        updatedUser.id = theUser._id;

                        return chai.request(app)
                            .put(`/api/users/${user._id}`)
                            .send(updatedUser);
                    })
                    .then(res => {
                        res.should.have.status(204);
                        return People.findById(updatedUser.id);
                    })
                    .then(user => {
                        user.firstName.should.equal(updatedUser.firstName);
                        user.lastName.should.equal(updatedUser.lastName);
                        user.username.should.equal(updatedUser.username);
                        user.password.should.equal(updatedUser.password);
                        user.email.should.equal(updatedUser.email);
                        user.nintendo.should.equal(updatedUser.nintendo);
                        user.playstation.should.equal(updatedUser.playstation);
                        user.xbox.should.equal(updatedUser.xbox);
                        user.platform.should.equal(updatedUser.platform);
                    });
            });
        });

        describe('Delete requests for users', function () {
            it('Should delete user data by id', function () {
                let user;

                return People
                    .findOne()
                    .then(_user => {
                        user = _user;
                        return chai.request(app).delete(`/api/users/${user._id}`);
                    })
                    .then(res => {
                        res.should.have.status(204);
                        return People.findById(user._id);
                    })
                    .then(_user => {
                        should.not.exist(_user);
                    });
            });
        });
        
    });
});

