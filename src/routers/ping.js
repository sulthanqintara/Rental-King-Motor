// SUB RUTE UNTUK TESTING
const pingRouter = require("express").Router();

const pingHandler = require("../handlers/ping");

pingRouter.get("/", pingHandler.testHello);

module.exports = pingRouter;
