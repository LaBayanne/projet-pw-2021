const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());

<<<<<<< HEAD
=======
/**
 * @openapi
 * /all:
 *   get:
 *     description: Get all exchanges
 *     responses:
 *       '200':
 *         description: Returns the whole set of exchanges
 */
>>>>>>> b0da785751d796030af18de6c189f2ebf77438dd
router.get('/all', async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM exchange;");
        res.send(response.rows)
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
