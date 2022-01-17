const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());

router.get('/all', async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM exchange;");
        res.send(response.rows)
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
