const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const cors = require('cors');

pool.connect();

router.use(cors());

router.get("/all_projects_from_user/:id_user", async (req,res) => {
    try {
        const response = await pool.query("SELECT id_projet FROM projets_with_users WHERE id_user = ($1);", [req.params.id_user]);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
});


router.get("/all_users_from_project/:id_projet", async (req,res) => {
    try {
        const response = await pool.query("SELECT id_user FROM projets_with_users WHERE id_projet = ($1);", [req.params.id_projet]);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.post("/add_new/:id_projet/:id_user/:name", async (req, res) => {
    try {
        const response = await pool.query("INSERT INTO projets_with_users(id_projet,id_user) VALUES ($1,$2);",[req.params.id_projet,req.params.id_user]);
        const reponse2 = await pool.query("INSERT INTO projet(id,name) VALUES ($1,$2);",[req.params.id_projet,req.params.name]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.post("/add_user_to_project/:id_projet/:id_user", async (req,res) => {
    try {
        await pool.query("INSERT INTO projets_with_users(id_projet,id_user) VALUES ($1,$2);",[req.params.id_projet,req.params.id_user]);
        res.end();
    } catch (error) {
        console.error(error);
    }
})

router.delete("/delete_project/:id_projet", async (req,res) => {
    try {
        await pool.query("DELETE FROM projets WHERE id = ($1);",[req.params.id_projet]);
        await pool.query("DELETE FROM projets_with_users WHERE id_projet = ($1);",[req.params.id_projet]);
        res.end();
    } catch (error) {
        console.error(error);
    }
})
router.delete("/delete_user_from_project/:id_projet/:id_user", async (req,res) => {
    try {
        const response = await pool.query("DELETE FROM projets_with_users WHERE id_projet = ($1) AND id_user = ($2);",[req.params.id_projet, req.params.id_user]);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.put("/change/:id_projet/:new_name", async (req,res) => {
    try {
        await pool.query("UPDATE projets SET name = ($2) WHERE  id = ($1);",[req.params.id_projet,req.params.new_name]);
        res.end();
    } catch (error) {
        console.error(error);
    }

})

module.exports = router;