const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());

router.get('/isAccount', async (req,res) => {
    try {
        const response = await pool.query("SELECT * from account;");
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.post('/createAccount/:name/:password', async (req, res) => {
    try {
        await pool.query("INSERT INTO account (name,password) VALUES ($1,$2);",[req.params.name, req.params.password]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

/*router.post('/new/:id/:name/:password',async (req,res) => {
    try {
        await pool.query("INSERT INTO account(id,name,password) VALUES ($1,$2,$3);",[req.params.id,req.params.name,req.params.password]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.get('/get_by_name/:name', async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM account WHERE name = ($1);",[req.params.name]);
        res.send( response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.get('/get_by_id/:id', async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM account WHERE id = ($1);",[req.params.id])
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.delete('/delete/:id', async (req,res) => {
    try {
        await pool.query("DELETE FROM account WHERE id = ($1);",[req.params.id]);
        res.end();
    } catch (error) {
        console.error(error);
    }
})*/

module.exports = router;
