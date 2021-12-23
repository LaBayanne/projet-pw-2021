const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    password:'postgres',
    database:'erasmus',
    port: 5432
})

module.exports = pool;