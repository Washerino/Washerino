const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../db');


const router = express.Router();
router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','login.html'));
});


router.post('/', (req, res) => {
      let userDetails = {};
      let isValid = false;

      const data = fs.readFileSync(path.join(__dirname,'..','users_db.json'), {encoding: 'utf8', flag:'r'});
      
      const users = JSON.parse(data);

      for(let i = 0; i < users.user.length; i++) {
          console.log(users.user[i]);
          console.log(users.user[i].email)
          if (users.user[i].email === req.body.email && users.user[i].password == req.body.password ) {

            userDetails = {
              id: users.user[i]._id,
              email: users.user[i].email,
              name: users.user[i].name,
              registration: users.user[i].registration,
              userType: users.user[i].user_Type,
              wallet: users.user[i].wallet
            }
            
            return res.status(200).json(userDetails);
          }
      }
      return res.status(401).json("Incorrect username or password");
});
module.exports = router;