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

describe('POST /addStationData', () => {

    it('Inserted station data into database', (done) => {
        
        request
        .post('/monitor/addStationData')
        .send({ waterLevel: "68", waterQuality: "Good", stationID: 100, rangerID:1, date: "2021-09-21"})
        .expect(200)
        .expect('"station data successfully added"')
        .end(done);
    });
});

describe('POST /createStation', () => {

    it('Inserted station into database', (done) => {
        
        request
        .post('/map/createStation')
        .send({ longitude: "-19.966280", latitude: "138.418700", information: "Norwich", operating:true})
        .expect(200)
        .expect('"station successfully created"')
        .end(done);
    });
});

describe('Delete /deleteStation/:id', () => {

    it('Delete station from database', (done) => {
        
        request
        .delete('/map/deleteStation/102')
        .expect(200)
        .expect('"Station successfully deleted"')
        .end(done);
    });
});



//map tests :)

describe('GET map/getAllStations/',()=>{
    it("All stations retrieved from database for map",(done)=> {

        request
            .get('/map/getAllStations')
            .expect(200)
            .end(done)
    });
});

describe('GET map/getStation/:id',()=>{
    it("Got station from station id",(done)=> {

       request
            .get('/map/getStation/100')
            .expect(200)
            .end(done)
    });
});

