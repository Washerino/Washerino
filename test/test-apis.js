const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const request = require('supertest')(app);

//ranger tests

describe('POST ranger/createRanger', () => {

    it('Adds a ranger to the database', (done) => {
        
        request
        .post('/ranger/createRanger')
        .send({ rangerName: "harryRed", username: "harry10", password: "1234"})
        .expect(200)
        .expect('"Ranger successfully created"')
        .end(done);
    });
});

describe('GET ranger/getAllRangers', () => {

    it('Fetches all the rangers from the database', (done) => {

        request
        .get('/ranger/getAllRangers')
        .expect(200)
        .end(done);

    });
});

//login tests

describe('POST /login', () => {

    it('logs user in successfully', (done) => {
        
        request
        .post('/login')
        .send({ username: "username", password: "password"})
        .expect(200)
        .expect({
            "id": 1,
            "rangername": "Harry Redman",
            "username": "username"
        })
        .end(done);
    });
});

describe('POST /login', () => {

    it('Incorrect login details', (done) => {
        
        request
        .post('/login')
        .send({ username: "harry1", password: "1234"})
        .expect(401)
        .expect('"Incorrect Username or Password"')
        .end(done);
    });
});