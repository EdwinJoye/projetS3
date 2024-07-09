const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// Route pour ajouter un nouveau meuble
router.post("/add", async (req, res) => {
  try {
    const { name, category } = req.body;
    const [result] = await pool.query(
      "INSERT INTO furnitures (name, category) VALUES (?, ?)",
      [name, category]
    );
    res.json({ id: result.insertId, name, category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour obtenir tous les meubles
router.get("/all", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM furnitures");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
