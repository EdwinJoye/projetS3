const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// Route pour ajouter un nouveau meuble
router.post("/add", async (req, res) => {
  try {
    const { name, category_id, materials_used, img } = req.body;
    const result = await pool.query(
      "INSERT INTO furnitures (name, category_id, materials_used, img) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, category_id, materials_used, img]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour obtenir tous les meubles
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM furnitures");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour supprimer un meuble
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM furnitures WHERE id = $1", [id]);
    res.json({ message: "Meuble supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour récupérer les meubles une fois filtrés
router.get("/filtered", async (req, res) => {
  try {
    const { materials } = req.query;

    if (!materials) {
      const result = await pool.query("SELECT * FROM furnitures");
      return res.json(result.rows);
    }

    const materialNames = materials
      .split(",")
      .map((material) => material.trim().toLowerCase());

    const queryText = `
      SELECT *
      FROM furnitures
      WHERE EXISTS (
        SELECT 1
        FROM unnest(materials_used) AS m(material)
        WHERE LOWER(m) = ANY($1)
      )
    `;

    const result = await pool.query(queryText, [materialNames]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error in /filtered route:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
