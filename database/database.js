const { Pool } = require("pg");

const pool = new Pool({
    user: "fmuhtasim",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "yt_login_system", // Default database to connect to
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
});

module.exports = pool;

