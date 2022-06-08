const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../db');


const router = express.Router();
router.use(express.json()); // => req.body


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','map.html'));
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

//gets a given station details
router.get("/getStation/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const stationDetails = await pool.query("SELECT * FROM statio  WHERE ID = $1", [id]);

        res.json(stationDetails.rows);
        
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