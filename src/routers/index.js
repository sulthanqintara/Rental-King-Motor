// RUTE UTAMA
const mainRouter = require("express").Router();

const pingRouter = require("./ping");
const vehiclesRouter = require("./vehicles");
const transactionsRouter = require("./transactions");
const userRouter = require("./users");
const authRouter = require("./auth");

mainRouter.use("/", pingRouter);
mainRouter.use("/vehicles", vehiclesRouter);
mainRouter.use("/transactions", transactionsRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
