
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const faker = require('faker');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const { Posts } = require('../models');
const { People } = require('../people/models');
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
                    return Posts.count();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
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
                        post.should.include.keys('id', 'title', 'content', 'user');
                    });
                    resPost = res.body[0];
                    return Posts.findById(resPost.id)
                })
                .then(post => {
                    resPost.title.should.equal(post.title);
                    resPost.content.should.equal(post.content);
                    resPost.user.should.equal('unknown');
                })
        })
    });

    describe('Post request for posts', function () {
        it('Should create a new post', function () {
            
            const newUser = {
                firstName: 'john',
                lastName: 'doe',
                username: 'mrjohnddoee',
                password: 'Thinkful101'
            }
            return People.create(newUser);
            const newPost = {
                user_id: newUser._id,
                user: newUser.username,
                title: 'hello',
                content: 'world'              
            }

            return chai.request(app)
                .post('/api/users')
                .send(newUser)
                .then(() => {

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
    })

    describe('Put requests for posts', function () {
        it('Should update post', function () {
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
    });

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

