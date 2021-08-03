const historyModel = require("../models/history");
const responseHelper = require("../helper/response");

const postNewHistory = (req, res) => {
  const { body } = req;
  historyModel
    .postNewHistory(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getHistory = (req, res) => {
  const { query } = req;

  historyModel
    .getHistory(query)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteHistory = (req, res) => {
  const { query } = req;
  historyModel
    .deleteHistory(query)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  postNewHistory,
  getHistory,
  deleteHistory,
};
