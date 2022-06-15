const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../db');


const router = express.Router();
router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','logbook.html'));
});

// retrieve reports for different sations
router.get("/getReport/:id", async(req, res) => {

    try {
        const { id } = req.params;
        const details = await pool.query("SELECT Issue FROM report  WHERE ID = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve staion reports");
    }
});

// select reports only rangers have posted
router.get("/getReport/:id", async(req, res) => {

    try {
        const { id } = req.params;
        const details = await pool.query("SELECT RangerID, Issue FROM report  WHERE ID = $1", [id]);
        res.json(details.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve staion reports");
    }
});



//update the status of a report to closed;
router.put("/closeReport/:id", async(req, res) => {


    try {

        const { id } = req.params;
        const stationDetails = await pool.query("UPDATE report SET Cleared = true WHERE ID = $1", [id]);
        res.json("Report successfully closed");

    } catch (err) {
        console.error(err.message);
        res.json("Couldnt update report status");
    }
});

module.exports = router;