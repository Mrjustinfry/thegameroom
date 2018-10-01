'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../server.js');

chai.use(chaiHttp);

describe('serving static', function () {
    it('Should display index.html with a 200 status', function () {
        return chai
            .request(app)
            .get('/')
            .then(function (res) {
                res.should.have.status(200);
        })
    })
})