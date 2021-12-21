const express = require('express');
const router = express.Router();
const pool = require('../config/db');

//app.use(express.json());
pool.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 

router.post('/new_post_it', async (req,res) => {
  try{
    const response = await pool.query('INSERT INTO post_it(id,date_creation,estimation_temp) VALUES ($1,$2,$3);',[req.body.id, req.body.date,req.body.estimation_temp]);
    res.send(response);
  }catch(error){
    console.log(error.message);
  }
});


router.get('/all_post_it', async (req,res) => {
  try{
    const response = await pool.query("SELECT * FROM post_it;");
    res.send(response.rows);
  }catch(err){
    console.error(err.message);
  }
});


router.put('/change_post_it/:colonne/:id', async (req,res) => {
  const colonne = req.params.colonne;
  const query = "";
  switch (colonne) {
    case "description":
      qry = "UPDATE post_it SET description = ($2) WHERE id = ($1);";
      break;
    default:
      break;
  }

  try {
    const response = await pool.query(qry,[req.params.id, req.body.data]);
    res.end();
  } catch (error) {
    console.error(error.message);
  }

}); */

/**
 * Ajoute un nouveau sprint à la base de données
 */

router.post('/new_sprint', async (req,res) => {
  try{
    const response = await pool.query("INSERT INTO sprint(id) VALUES ($1);",[req.body.id]);
    res.send(response);
  }catch(err){
    console.error(err.message);
  }
});

/**
 * Récupère tous les sprints
 */
router.get('/all_sprint', async (req,res) => {
  try{
    const response = await pool.query("SELECT * FROM sprint;");
    res.send(response.rows);
  }catch(err){
    console.error(err.message);
  }
});

/**
 * Ajoute un nouveau kanban à la base de données
 */
router.post('/new_kanban', async (req,res) => {
  try {
    const response = await pool.query("INSERT INTO kanban(id,id_sprint) VALUES ($1,$2);", [req.body.id,req.body.id_sprint]);
    res.send(response.rows);
  } catch (error) {
    console.log(error.message);
  }
});


/**
 * Récupère le Kanban d'un sprint
 */
router.get('/kanban_of_sprint/:id', async (req,res) => {
  try {
    const response = await pool.query("SELECT * FROM kanban WHERE id_sprint = ($1);" ,[req.params.id]);
    res.send(response.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/change_kanban_titre/:id', async (req,res) => {
  try {
    const response = await pool.query("UPDATE kanban SET titre = ($2) WHERE  id = ($1);",[req.params.id, req.body.titre]);
    res.send(response.rows);
  } catch (error) {
    console.log(error.message);    
  }
});

/* app.listen(3000, () => console.log("Listening on 3000"));
 */
module.exports = router;
