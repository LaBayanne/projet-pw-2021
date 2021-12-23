const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());

//Get all colonne from a kanban
router.get('/all', async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM echange;");
        res.send(response.rows)
    } catch (error) {
        console.error(error);
    }
});

router.post('/new/:id/:person_name/:starting_date/:ending_date/:attached_team/:country_destination/:city_destination/:country_origin/:city_origin', async (req,res) => {
    try{
        const response = await pool.query('INSERT INTO echange(id,person_name,starting_date,ending_date,attached_team,country_destination,city_destination,country_origin,city_origin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
                          [req.params.id, req.params.person_name, req.params.starting_date, req.params.ending_date,
                            req.params.attached_team, req.params.country_destination, req.params.city_destination,
                            req.params.country_origin,req.params.city_origin]);
        res.end();
    }catch(error){
      console.log(error.message);
    }
});

router.post('/new/:id/:person_name/', async (req,res) => {
    try{
        const response = await pool.query('INSERT INTO echange(id,person_name) VALUES ($1,$2);',
                          [req.params.id, req.params.person_name]);
        res.end();
    }catch(error){
      console.log(error.message);
    }
});

module.exports = router;
