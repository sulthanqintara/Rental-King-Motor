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
    .getHistoryAmount(query)
    .then((data) => {
      const queryString =
        "UPDATE popularity p SET p.amount_rented = ? WHERE p.id = ?";
      const queryPromise = new Promise((resolve, reject) => {
        db.query(
          queryString,
          [data.length, mysql.raw(query.model)],
          (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          }
        );
      });
      queryPromise
        .then((data) => responseHelper.success(res, 200, data))
        .catch((err) => responseHelper.error(res, 500, err));
    })
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
