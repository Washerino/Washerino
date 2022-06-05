const express = require('express');
const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');

const router = express.Router();
//create jsonParser so that data can be converted to json.
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','logbook.html'));
});
module.exports = router;