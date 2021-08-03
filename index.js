require("dotenv").config();
// const { json } = require("express");
const express = require("express");
const morgan = require("morgan");

const mainRouter = require("./src/routers/");

const app = express();
const port = 8000;

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

app.use(mainRouter);

// Base url => http://localhost:8000
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
