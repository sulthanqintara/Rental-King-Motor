require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const mainRouter = require("./src/routers/");

const app = express();
const port = 8000;

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(express.static("public"));

// app.use(cors());
app.use(mainRouter);

// Base url => http://localhost:8000
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
