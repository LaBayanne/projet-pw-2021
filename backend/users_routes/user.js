const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());

router.post('/new/:id/:name/:mdp',async (req,res) => {
    try {
        await pool.query("INSERT INTO users(id,name,mdp) VALUES ($1,$2,$3);",[req.params.id,req.params.name,req.params.mdp]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.put('/change_mdp/:id/:new', async (req,res) => {
    try {
        await pool.query('UPDATE users SET mdp = ($2) WHERE id = ($1);',[req.params.id,req.params.new]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.put('/change_username/:id/:new', async (req,res) => {
    try {
        await pool.query("UPDATE users SET name = ($2) WHERE id = ($1);",[req.params.id,req.params.new]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.get('/get_by_name/:name', async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM users WHERE name = ($1);",[req.params.name]);
        res.send( response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.get('/get_by_id/:id', async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM users WHERE id = ($1);",[req.params.id])
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.delete('/delete/:id', async (req,res) => {
    try {
        await pool.query("DELETE FROM users WHERE id = ($1);",[req.params.id]);
        res.end();
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;