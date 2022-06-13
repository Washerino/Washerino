const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../db');


const router = express.Router();
router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public',"map_requirements",'monitor.html'));
});

// retrieve water level using id
router.get("/getWaterLevel/:id", async(req, res) => {

    try {
        const { id } = req.params;
        const details = await pool.query("SELECT WaterLevel FROM station_check  WHERE ID = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Error occured during water level retrieval");
    }
});

// retrieve water quality using id
router.get("/getWaterQuality/:id", async(req, res) => {

    try {
        const { id } = req.params;
        const details = await pool.query("SELECT WaterQuality FROM station_check  WHERE ID = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Error occured during water quality retrieval");
    }
});

// retrieve last checked date using id
router.get("/getCheckDate/:id", async(req, res) => {

    try {
        const { id } = req.params;
        const details = await pool.query("SELECT CheckDate FROM station_check  WHERE ID = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Error occured during check date retrieval");
    }
});

// retrieve stations' assigned ranger using id
router.get("/getRanger/:id", async(req, res) => {

    try {
        //console.log("reached getstationranger");
        const { id } = req.params;
        const details = await pool.query("SELECT RangerID FROM station_check  WHERE id = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Error occured during ranger id retrieval");
    }
});


router.post("/addStationData", async(req, res) => {

    try {
        const { waterLevel } = req.body;
        const { waterQuality } = req.body;
        const { stationID } = req.body;
        const { rangerID } = req.body;
        const { date } = req.body;

        const details = await pool.query("INSERT INTO station_check (waterlevel, waterQuality, stationID, rangerID, checkdate) VALUES ($1, $2, $3, $4, $5)", [waterLevel, waterQuality, stationID, rangerID, date]);

        res.json("station data successfully added");
    } catch (err) {
        console.error(err.message);
        res.json("Error trying to add data");
    }
});


// retrieve stations name using id
router.get("/getStationName/:id", async(req, res) => {
    try {
        console.log("reached get station name");
        const { id } = req.params;
        const details = await pool.query("SELECT INFORMATION FROM station  WHERE ID = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Error occured during station name retrieval");
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

module.exports = router;