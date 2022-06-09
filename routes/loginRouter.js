const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../db');


const router = express.Router();
router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','login.html'));
});


// checks user login details against users db
router.get('/login', async(req, res) => {

  try {
      const { id } = req.params;
      const details = await pool.query("SELECT * FROM users  WHERE Email = $1 && WHERE Password = $2", [email, password ]);
      //if valid, do thing?
      res.json(details.rows);
      
  } catch (err) {
      console.error(err.message);
      res.json("Couldnt find user / user does not exist");
  }
});

module.exports = router;