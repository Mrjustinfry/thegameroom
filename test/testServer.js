'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const faker = require('faker');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const { Posts, Users } = require('../models');
const { closeServer, runServer, app } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function seedPostData() {
    console.info('seeding data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
        seedData.push({
            title: faker.lorem.words(),
            content: faker.lorem.sentence()
        });
    }
    return Posts.insertMany(seedData);
}

function seedUserData() {
    console.info('seeding data');
    const seedUserData = [];
    for (let i = 1; i <= 10; i++) {
        seedUserData.push({
            firstName: faker.name.firstName,
            lastName: faker.name.lastName,
            userName: faker.internet.userName,
            passWord: faker.random.word,
            email: faker.internet.email,
            nintendo: faker.random.number,
            playstation: faker.random.word,
            xbox: faker.random.word,
            platform: faker.random.word
        });
    }
    return Users.insertMany(seedUserData);
}

describe('The game room api (posts)', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedPostData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });



    describe('serving static index', function () {
        it('Should display Landing Page with a 200 status', function () {
            return chai
                .request(app)
                .get('/')
                .then(function (res) {
                    res.should.have.status(200);
                })
        })
    })

    describe('Get requests for Posts', function () {
        it('Should display all posts with a 200 status', function () {
            let res;
            return chai.request(app)
                .get('/posts')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1)
                    return Posts.countDocuments();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                    console.log(count);
                })
        })

        it('Should return posts with correct info', function () {
            let resPost;
            return chai.request(app)
                .get('/posts')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.a.lengthOf.at.least(1);
                    res.body.forEach(function (post) {
                        post.should.be.a('object');
                        post.should.include.keys('id', 'title', 'content');
                    });
                    resPost = res.body[0];
                    return Posts.findById(resPost.id)
                })
                .then(post => {
                    resPost.title.should.equal(post.title);
                    resPost.content.should.equal(post.content);
                })
        })
    });

    describe('Post request for posts', function () {
        it('Should create a new post', function () {

            const newPost = {
                title: faker.lorem.words(),
                content: faker.lorem.sentences()
            }

            return chai.request(app)
                .post('/posts')
                .send(newPost)
                .then(res => {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'title', 'content');
                    res.body.title.should.equal(newPost.title);
                    res.body.id.should.not.be.null;
                    res.body.content.should.equal(newPost.content);
                    return Posts.findById(res.body.id);
                })
                .then(post => {
                    post.title.should.equal(newPost.title);
                    post.content.should.equal(newPost.content);
                })
        })
    })

    describe('Put requests for posts', function () {
        const updatedPost = {
            title: "Hello",
            content: "How are you doing?"
        }
        return Posts.findOne()
            .then(post => {
                updatedPost.id = post.id;
                return chai.request(app)
                    .put(`/posts/${updatedPost.id}`)
                    .send(updatedPost)
            })
            .then(function (res) {
                res.should.have.status(204);
                return Posts.findById(updatedPost.id);
            })
            .then(res => {
                res.title.should.equal(updatedPost.title);
                res.content.should.equal(updatedPost.content);
            })
    })

    describe('Delete requests for posts', function () {
        it('Should delete posts by id', function () {
            let post;

            return Posts
                .findOne()
                .then(_post => {
                    post = _post;
                    return chai.request(app).delete(`/posts/${post.id}`);
                })
                .then(res => {
                    res.should.have.status(204);
                    return Posts.findById(post.id);
                })
                .then(_post => {
                    should.not.exist(_post);
                });
        });
    });

});


describe('The game room api (users)', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedUserData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });

    describe("Get requests for users", function () {
        it('Should return all user data', function () {
            let res;

            return chai.request(app)
                .get('/users')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1);
                    return Users.countDocuments();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                    console.log(count);
                });
        });
        
        it('Should return users with correct info', function () {
            let resUser;
            return chai.request(app)
                .get('/users')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.a.lengthOf.at.least(1);
                    res.body.forEach(function (user) {
                        user.should.be.a('object');
                        user.should.include.keys(
                            'id',
                            'firstName',
                            'lastName',
                            'userName',
                            'passWord',
                            'email',
                            'nintendo',
                            'playstation',
                            'xbox',
                            'platform'
                        );
                    });
                    resUser = res.body[0];
                    return Users.findById(resUser.id)
                })
                .then(user => {
                    resUser.firstName.should.equal(user.firstName);
                    resUser.lastName.should.equal(user.lastName);
                    resUser.userName.should.equal(user.userName);
                    resUser.passWord.should.equal(user.passWord);
                    resUser.email.should.equal(user.email);
                    resUser.nintendo.should.equal(user.nintendo);
                    resUser.playstation.should.equal(user.playstation);
                    resUser.xbox.should.equal(user.xbox);
                    resUser.platform.should.equal(user.platform);
                })
        })
        
    });

    describe('Post requests for users', function () {
        it('Should create a new user', function () {
            const newUser = {
                firstName: "Fred",
                lastName: "Astaire",
                userName: "DanceOnAir",
                passWord: "GingerRogers",
                email: "TwoStep@dance.com",
                nintendo: "SW-1234-5678-9098",
                playstation: "Freddie",
                xbox: "fred",
                platform: "playstation"
            }

            return chai.request(app)
                .post('/users')
                .send(newUser)
                .then(res => {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'firstName',
                        'lastName',
                        'userName',
                        'passWord',
                        'email',
                        'nintendo',
                        'playstation',
                        'xbox',
                        'platform'
                    );
                    res.body.id.should.not.be.null;
                    res.body.firstName.should.equal(newUser.firstName);
                    res.body.lastName.should.equal(newUser.lastName);
                    res.body.userName.should.equal(newUser.userName);
                    res.body.passWord.should.equal(newUser.passWord);
                    res.body.email.should.equal(newUser.email);
                    res.body.nintendo.should.equal(newUser.nintendo);
                    res.body.playstation.should.equal(newUser.playstation);
                    res.body.xbox.should.equal(newUser.xbox);
                    res.body.platform.should.equal(newUser.platform);
                    return Users.findById(res.body.id);
                })
                .then(user => {
                    user.firstName.should.equal(newUser.firstName);
                    user.lastName.should.equal(newUser.lastName);
                    user.userName.should.equal(newUser.userName);
                    user.passWord.should.equal(newUser.passWord);
                    user.email.should.equal(newUser.email);
                    user.nintendo.should.equal(newUser.nintendo);
                    user.playstation.should.equal(newUser.playstation);
                    user.xbox.should.equal(newUser.xbox);
                    user.platform.should.equal(newUser.platform);
                });
        });
    });

    describe('Put requests for users', function () {
        it('should update user data by id', function () {
        const updatedUser = {
            firstName: "Fred",
            lastName: "Astaire",
            userName: "DanceOnAir",
            passWord: "GingerRogers",
            email: "TwoStep@dance.com",
            nintendo: "SW-1234-5678-9098",
            playstation: "Freddie",
            xbox: "fred",
            platform: "playstation"
        };

        return Users
            .findOne()
            .then(user => {
                updatedUser.id = user.id;

                return chai.request(app)
                    .put(`/users/${user.id}`)
                    .send(updatedUser);
            })
            .then(res => {
                res.should.have.status(204);
                return Users.findById(updatedUser.id);
            })
            .then(user => {
                user.firstName.should.equal(updatedUser.firstName);
                user.lastName.should.equal(updatedUser.lastName);
                user.userName.should.equal(updatedUser.userName);
                user.passWord.should.equal(updatedUser.passWord);
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

            return Users
                .findOne()
                .then(_user => {
                    user = _user;
                    return chai.request(app).delete(`/users/${user.id}`);
                })
                .then(res => {
                    res.should.have.status(204);
                    return Users.findById(user.id);
                })
                .then(_user => {
                    should.not.exist(_user);
                });
        });
    });

});