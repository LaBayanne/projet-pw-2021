const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());


router.get("/all", async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM sprint;");
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
})
router.get("/:id", async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM sprint WHERE id = ($1);",[req.params.id]);
        res.send(response.rows)
    } catch (error) {
        console.error(error);
    }
});

router.post("/new/:id/:date/:id_projet/:titre", async (req,res) => {
    try {
        const response = await pool.query("INSERT INTO sprint(id,date_debut,id_projet,titre) VALUES ($1,$2,$3,$4);",
                    [req.params.id,req.params.date,req.params.id_projet,req.params.titre]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.put("/change_begin/:id/:date_debut", async (req,res) => {
    try {
        const response = pool.query("UPDATE sprint SET date_debut = ($2) WHERE id = ($1);",[req.params.id,req.params.date_debut]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.put("/change_end/:id/:date_fin", async (req,res) => {
    try {
        const response = pool.query("UPDATE sprint SET date_fin = ($2) WHERE id = ($1);",[req.params.id,req.params.date_fin]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.delete("/delete/:id", async (req,res) => {
    try {
        const response = pool.query("DELETE sprint WHERE id = ($1);",[req.params.id]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
