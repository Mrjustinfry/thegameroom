'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../server.js');

chai.use(chaiHttp);

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
/*
describe('serving static hub', function () {
    it('Should display Main Page with a 200 status', function () {
        return chai
            .request(app)
            .get('./hub')
            .then(function (res) {
                res.should.have.status(200);
            })
    })
})

describe('serving static profile', function () {
    it('Should display Profile Page with a 200 status', function () {
        return chai
            .request(app)
            .get('./profile')
            .then(function (res) {
                res.should.have.status(200);
            })
    })
})
*/