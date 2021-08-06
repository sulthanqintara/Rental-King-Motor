const popularityModel = require("../models/popularity");
const responseHelper = require("../helper/response");
const mysql = require("mysql");
const db = require("../database/mysql");

const viewPopularVehicles = (req, res) => {
  const { query } = req;
  popularityModel
    .viewPopularVehicles(query)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updateHistory = (req, res) => {
  // for (let i = 9; i < 9+body.length;i++){}
  const { query } = req;
  popularityModel
    .updateHistoryAmount(query)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const postNewPopularity = (req, res) => {
  const { body } = req;
  popularityModel
    .postNewPopularity(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  updateHistory,
  viewPopularVehicles,
  postNewPopularity,
};
