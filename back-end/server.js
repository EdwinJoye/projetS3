const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");

const materialRoutes = require("./routes/material.routes");
const furnitureRoutes = require("./routes/furniture.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// CSP avec les directives nécessaires
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'sha256-kPx0AsF0oz2kKiZ875xSvv693TBHkQ/0SkMJZnnNpnQ='",
      ],
    },
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
app.use("/materials", materialRoutes);
app.use("/furnitures", furnitureRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
