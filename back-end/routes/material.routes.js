const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// Route pour jouter un nouveau matériau
router.post("/add", async (req, res) => {
  try {
    const { name, type, supplier } = req.body;
    const [result] = await pool.query(
      "INSERT INTO materials (name, type, supplier) VALUES (?, ?, ?)",
      [name, type, supplier]
    );
    res.json({ id: result.insertId, name, type, supplier });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour obtenir tous les matériaux
router.get("/all", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM materials");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
