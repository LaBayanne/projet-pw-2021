const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());

router.post('/new/:id/:name/:password',async (req,res) => {
    try {
        await pool.query("INSERT INTO users(id,name,password) VALUES ($1,$2,$3);",[req.params.id,req.params.name,req.params.password]);
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
