const express = require("express");
const cors = require("cors");
const app = express();
const ErrorHandlerMiddleware = require("./middleware/error");

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
const product = require("./routes/product.route");

app.use("/user", user);
app.use("/product", product);

// Middleware for Errors
app.use(ErrorHandlerMiddleware);

module.exports = app;
