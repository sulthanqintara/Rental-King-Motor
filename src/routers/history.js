// SUB-RUTE UNTUK TABEL HISTORY
const historyRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const historyHandler = require("../handlers/history");

historyRouter.post(
  "/",
  authMiddleware.checkToken,
  authMiddleware.authUser,
  historyHandler.postNewHistory
);
historyRouter.get("/", historyHandler.getHistory);
historyRouter.delete("/", historyHandler.deleteHistory);

module.exports = historyRouter;
