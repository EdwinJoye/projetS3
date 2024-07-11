const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");

const materialRoutes = require("./routes/material.routes");
const furnitureRoutes = require("./routes/furniture.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/materials", materialRoutes);
app.use("/furnitures", furnitureRoutes);
app.use("/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
