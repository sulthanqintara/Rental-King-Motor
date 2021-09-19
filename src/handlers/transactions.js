const transactionsModel = require("../models/transactions");
const responseHelper = require("../helper/response");

const postNewTransaction = (req, res) => {
  const { body } = req;
  transactionsModel
    .postNewTransaction(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};
const patchTransaction = (req, res) => {
  const { body } = req;
  transactionsModel
    .patchNewTransaction(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getTransactions = (req, res) => {
  const { query } = req;
  transactionsModel
    .getTransactions(query)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};
const getLatestTransactionsID = (req, res) => {
  const { body } = req;
  transactionsModel
    .getLatestTransactionsID(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};
const getTransactionsById = (req, res) => {
  const { params } = req;
  transactionsModel
    .getTransactionsById(params)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteTransaction = (req, res) => {
  const { body } = req;
  transactionsModel
    .deleteTransaction(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  postNewTransaction,
  patchTransaction,
  getTransactions,
  getLatestTransactionsID,
  getTransactionsById,
  deleteTransaction,
};
