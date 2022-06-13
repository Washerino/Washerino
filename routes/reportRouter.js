const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    //placeholder
    res.sendFile(path.join(__dirname,'..','public','report.html'));
});


//create a new report
router.post("/createReport", async(req, res) => {
    try {
        const { rangerID } = req.body;
        const { stationID } = req.body;
        const { issue } = req.body;
        const cleared = false;

        console.log(rangerID);
        console.log(stationID);
        console.log(issue);

    
        const newRanger = await pool.query("INSERT INTO report (RangerId, stationID, Issue, Cleared) VALUES ($1, $2, $3, $4)", [rangerID, stationID, issue, cleared]);
    
        res.json("Report successfully created");
    } catch (err) {
        console.error(err.message);
        res.json("could not create report");
    }
});

//gets a given report details
router.get("/getReport/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const reportDetails = await pool.query("SELECT * FROM report WHERE ID = $1", [id]);

        res.json(reportDetails.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve report Details");
    }
});

//gets all report details
router.get("/getAllReports/", async(req, res) => {

    try {

        const reportDetails = await pool.query("SELECT * FROM report");

        res.json(reportDetails.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve rangers Details");
    }
});

//deletes a given report
router.delete("/deleteReport/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const reportDetails = await pool.query("DELETE FROM report WHERE ID = $1", [id]);

        res.json("Report successfully deleted");
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve report Details");
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