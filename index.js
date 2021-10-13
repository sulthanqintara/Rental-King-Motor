require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const mainRouter = require("./src/routers/");
const { http } = require("npmlog");

const app = express();
const httpServer = createServer(app);
const cors = {
  origin: ["http://localhost:3000"],
};
const io = new Server(httpServer, {
  cors,
});
const port = 8000;

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());

app.use(express.static("public"));
app.use(mainRouter);

io.on("connection", (socket) => {
  console.log("Socket Connected on", socket.id);
});

// Base url => http://localhost:8000
httpServer.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
const socketIoObject = io;
module.exports.ioObject = socketIoObject;
