require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Importe les routeurs
const materialRoutes = require("./routes/material.routes");
const furnitureRoutes = require("./routes/furniture.routes");

// Utilisation des autres routeurs
app.use("/materials", materialRoutes);
app.use("/furnitures", furnitureRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
