const Pool = require('pg').Pool;

const pool = new Pool({
    user:'qkshpizm',
    password:'S_HNJjAB849I7p46yd50q6kuVPP8lHUJ',
    database:'qkshpizm',
    host: 'tyke.db.elephantsql.com'
})

module.exports = pool;