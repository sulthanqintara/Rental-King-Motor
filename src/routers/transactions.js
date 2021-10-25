// SUB-RUTE UNTUK TABEL HISTORY
const historyRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const transactionsHandler = require("../handlers/transactions");

historyRouter.get(
  "/latest",
  authMiddleware.checkToken,
  transactionsHandler.getLatestTransactionsID
);
historyRouter.get(
  "/:id",
  authMiddleware.checkToken,
  transactionsHandler.getTransactionsById
);
historyRouter.post(
  "/",
  authMiddleware.checkToken,
  transactionsHandler.postNewTransaction
);
historyRouter.patch(
  "/",
  authMiddleware.checkToken,
  transactionsHandler.patchTransaction
);
historyRouter.get("/", transactionsHandler.getTransactions);
historyRouter.delete(
  "/",
  authMiddleware.checkToken,
  transactionsHandler.deleteTransaction
);

module.exports = historyRouter;
