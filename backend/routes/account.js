const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');

pool.connect();

router.use(cors());

router.post('/isAccount/', async (req,res) => {
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

router.post('/populate', async (req,res) => {

    /*apps = ['SonsOfAnarchy', 'Illuminati', 'RocketTeam'];
    

    try {
        const origin = await axios.get("https://random-data-api.com/api/users/random_user");
        const destination = await axios.get("https://random-data-api.com/api/users/random_user");
        const app = Math.floor(Math.random() * 3);
        const bdate= Math.floor(Math.random() * 31).toString() + "-" + Math.floor(Math.random() * 13).toString() + "-201" + Math.floor(Math.random() * 10).toString(); 
        const edate= Math.floor(Math.random() * 31).toString() + "-" + Math.floor(Math.random() * 13).toString() + "-202" + Math.floor(Math.random() * 10).toString();

        await pool.query("INSERT INTO exchange (person_name,starting_date,ending_date,attached_team,country_destination,country_origin,city_destination,city_origin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)", [origin["data"]["last_name"],bdate,edate,app,destination["data"]["address"]["country"],origin["data"]["address"]["country"],destination["data"]["address"]["city"],origin["data"]["address"]["city"]]);
        console.log("Entered");
        res.end();
    } catch(err) {
        console.log("error: ", err);
    }*/
});

module.exports = router;
