const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');

pool.connect();

router.use(cors());

router.post('/isAccount', async (req,res) => {
    try {
        const name = req.body.name;
        const passwd = req.body.password;

        const response = await pool.query("SELECT * from account;");
        const rows = response.rows;
        for(let key in rows){
            if(rows.hasOwnProperty(key) && rows[key]["name"] === name){
                bcrypt.compare(passwd, rows[key]["password"])
                .then(resultCompare => res.send(resultCompare))
                .catch(err => err)
            }
        }
        res.send(false);
    } catch (error) {
        console.error(error);
    }
});

router.post('/createAccount', async (req, res) => {
    try {
        const name = req.body.name;
        const passwd = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwd, salt);
        await pool.query("INSERT INTO account (name,password) VALUES ($1,$2);",[name, hashedPassword]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
