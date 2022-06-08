const { Pool } = require('pg');

const pool = new Pool ({
    user: "postgres",
    password: "password",
    database: "washdown_stations",
    host: "localhost",
    port: 5432
});

module.exports = pool;