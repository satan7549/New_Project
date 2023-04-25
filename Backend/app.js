const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

/* import all routes */
const user = require("./routes/user.route");

app.use("/user", user);

module.exports = app;
