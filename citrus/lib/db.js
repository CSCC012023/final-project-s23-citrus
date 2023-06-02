const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

export const getClient = () => {
    return pool.connect()
}