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
router.post('/login', async(req, res) => {

  try {
      const { username } = req.body;
      const { password } = req.body;
      const isCorrect = await pool.query("SELECT COUNT(*) FROM ranger WHERE USERNAME = $1 AND ADMINPASSWORD = $2", [username, password ]);
      //if valid, do thing?

      if (isCorrect.rows[0].count == 1) {
        const details = await pool.query("SELECT ID, RangerName, Username FROM ranger WHERE USERNAME = $1 AND ADMINPASSWORD = $2", [username, password ]);
        res.status(200).json(details.rows);
      } else {
        res.json("Incorrect Username or Password");
      }
      
  } catch (err) {
      console.error(err.message);
      res.json("Couldnt find user / user does not exist");
  }
});

module.exports = router;