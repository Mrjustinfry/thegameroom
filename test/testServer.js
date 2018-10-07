'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const faker = require('faker');

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
            title: faker.lorem.sentence(),
            content: faker.lorem.text()
        });
    }
    return Posts.insertMany(seedData);
}

function seedUserData() {
    console.info('seeding data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
        seedData.push({
            userName: faker.Name.firstname(),
            email: faker.Internet.email(),
            nintendo: user.nintendo,
            playstation: faker.Lorem.words(),
            xbox: faker.Lorem.words(),
            platform: faker.Lorem.words()
        });
    }
    return Users.insertMany(seedData);
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
                    res.should.have.lengthOf.at.least(1)
                    return Posts.count();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                })
        })
    });


});


