const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../db');


const router = express.Router();
router.use(express.json()); // => req.body


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','map_requirements','map.html'));
});

//create a new station
router.post("/createStation", async(req, res) => {
    try {
        const { longitude } = req.body;
        const { latitude } = req.body;
        const { information } = req.body;
        const { operating } = req.body;
    
        const newStation = await pool.query("INSERT INTO station (Longitude, Latitude, Information, Operating) VALUES ($1, $2, $3, $4)", [longitude, latitude, information, operating]);
    
        res.json("station successfully created");
    } catch (err) {
        console.error(err.message);
        res.json("cannot find station table");
    }
});

//create a new report
router.post("/createReport", async(req, res) => {
    try {
        const { rangerid } = req.body;
        const { stationid } = req.body;
        const { issue }= req.body;
        const { cleared} = req.body;
        const { newReport } = await pool.query("INSERT INTO report (rangerid, stationid, issue, cleared) VALUES ($1, $2, $3, $4)", [rangerid, stationid, issue, cleared]);
        res.json("report successfully created");
    } catch (err) {
        console.log(err);
        console.lod(err.message);
        res.json("cannot find report table");
    }
});


//gets a given station details
router.get("/getStation/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const stationDetails = await pool.query("SELECT * FROM station  WHERE ID = $1", [id]);

        res.json(stationDetails.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve station Details");
    }
});

// gets a given station check info
router.get("/getStationCheck/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const station_check_Details = await pool.query("SELECT * FROM station_check  WHERE stationid = $1", [id]);

        res.json(station_check_Details.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve station Details");
    }
});

//gets all station details
router.get("/getAllStations/", async(req, res) => {

    try {

        const stationDetails = await pool.query("SELECT * FROM station");

        res.json(stationDetails.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve stations Details");
    }
});

// update station check
router.post("/updateStationCheck/", async(req, res) => {

    try {

        const { type } = req.body;
        const { stationid } = req.body;
        const { datum } = req.body;
        const { date } = req.body;
        
        if(type == "waterlevel")
        {
            const { newData } = await pool.query( "UPDATE station_check SET waterlevel = $1, checkdate = $2 WHERE stationid = $3", [datum, date, stationid]);
            //console.log(res);
            res.json(newData.rows);
        }
        else
        {
            const { newData } = await pool.query( "UPDATE station_check SET waterquality = $1, checkdate = $2 WHERE stationid = $3", [datum, date, stationid]);
            //console.log(res);
            res.json(newData.rows);
        }
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt set station_check details");
    }
});

//gets all reports details
router.get("/getAllReports/", async(req, res) => {

    try {

        const stationDetails = await pool.query("SELECT * FROM report");

        res.json(stationDetails.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve stations Details");
    }
});


// count number of reports
router.get('/getNumberOfReports', async(req, res) => {

    try {
        const count = await pool.query("SELECT COUNT(*) FROM report");
    
        res.status(200).json(count.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt find reports");
    }
  });

//deletes a given station
router.delete("/deleteStation/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const stationDetails = await pool.query("DELETE FROM station WHERE ID = $1", [id]);

        res.json("Station successfully deleted");
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve station Details");
    }

});


//update the status of a station to either true or false;
router.put("/toggleOperating", async(req, res) => {

    
    try {

        const { id } = req.body;
        const {operating} = req.body;

        console.log(id);
        console.log(operating);

        const stationDetails = await pool.query("UPDATE station SET Operating = $1 WHERE ID = $2", [operating,id]);

        res.json("Station Operating succesfully updated");
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt update station status");
    }
});
module.exports = router;