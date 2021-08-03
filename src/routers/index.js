// RUTE UTAMA
const mainRouter = require("express").Router();

const pingRouter = require("./ping");
const vehiclesRouter = require("./vehicles");
const historyRouter = require("./history");
const popularityRouter = require("./popularity");

mainRouter.use("/", pingRouter);
mainRouter.use("/vehicles", vehiclesRouter);
mainRouter.use("/history", historyRouter);
mainRouter.use("/popularity", popularityRouter);

module.exports = mainRouter;
