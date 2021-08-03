// SUB-RUTE UNTUK TABEL HISTORY
const historyRouter = require("express").Router();

const historyHandler = require("../handlers/history");

historyRouter.post("/", historyHandler.postNewHistory);
historyRouter.get("/", historyHandler.getHistory);
historyRouter.delete("/", historyHandler.deleteHistory);

module.exports = historyRouter;
