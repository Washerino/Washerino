const express = require('express');
const path = require('path');
const fs = require('fs');

const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    //placeholder
    res.sendFile(path.join(__dirname,'..','public','ranger.html'));
});

//create a new ranger
router.post("/createRanger", async(req, res) => {
    try {
        const { rangerName } = req.body;
        const { username } = req.body;
        const { password } = req.body;
    
        const newRanger = await pool.query("INSERT INTO ranger (rangerName, username, AdminPassword) VALUES ($1, $2, $3)", [rangerName, username, password]);
    
        res.json("Ranger successfully created");
    } catch (err) {
        console.error(err.message);
        res.json("username already exists");
    }
});

//gets a given rangers details
router.get("/getRanger/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const rangerDetails = await pool.query("SELECT ID, RangerName, USERNAME FROM ranger WHERE ID = $1", [id]);

        res.json(rangerDetails.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve ranger Details");
    }
});

//gets all rangers details
router.get("/getAllRangers/", async(req, res) => {

    try {

        const rangerDetails = await pool.query("SELECT ID, RangerName, USERNAME FROM ranger");

        res.json(rangerDetails.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve rangers Details");
    }
});

//deletes a given ranger
router.delete("/deleteRanger/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const rangerDetails = await pool.query("DELETE FROM ranger WHERE ID = $1", [id]);

        res.json("Ranger successfully deleted");
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve ranger Details");
    }

});







module.exports = router;