const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const pool = require('./db');

const port = process.env.PORT || 3000;

app.use(express.json()); // => req.body

app.use(express.static('public'));
app.use(bodyParser.urlencoded( {extended: true}));

// default end-point - home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});


//create a new ranger
app.post("/createRanger", async(req, res) => {
    try {
        const { rangerName } = req.body;
        const { username } = req.body;
        const { password } = req.body;
    
        const newAdmin = await pool.query("INSERT INTO ranger (rangerName, username, AdminPassword) VALUES ($1, $2, $3)", [rangerName, username, password]);
    
        res.json("Ranger successfully created");
    } catch (err) {
        console.error(err.message);
        res.json("username already exists");
    }
    });

const loginRouter = require('./routes/loginRouter');
const monitorRouter = require('./routes/monitorRouter');
const reportRouter = require('./routes/reportRouter');
const rangerRouter = require('./routes/rangerRouter');
const logbookRouter = require('./routes/logbookRouter');
const mapRouter = require('./routes/mapRouter.js');

app.use('/login', loginRouter);
app.use('/monitor', monitorRouter);
app.use('/logbook', logbookRouter);
app.use('/report', reportRouter);
app.use('/ranger', rangerRouter);
app.use('/map', mapRouter);

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
})