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
        const { id } = req.params;
        const details = await pool.query("SELECT RangerID FROM station_check  WHERE ID = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Error occured during ranger id retrieval");
    }
});

module.exports = router;