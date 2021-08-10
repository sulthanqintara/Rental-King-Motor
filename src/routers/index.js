// RUTE UTAMA
const mainRouter = require("express").Router();

const pingRouter = require("./ping");
const vehiclesRouter = require("./vehicles");
const historyRouter = require("./history");
const popularityRouter = require("./popularity");
const userRouter = require("./users");
const authRouter = require("./auth");

mainRouter.use("/", pingRouter);
mainRouter.use("/vehicles", vehiclesRouter);
mainRouter.use("/history", historyRouter);
mainRouter.use("/popularity", popularityRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
