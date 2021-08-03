const db = require("../database/mysql");
const mysql = require("mysql");

const viewPopularVehicles = (query) => {
  return new Promise((resolve, reject) => {
    let queryString = `SELECT v.model, pop.amount_rented FROM popularity pop JOIN vehicles v ON pop.id = v.id ORDER BY pop.amount_rented ?`;
    db.query(queryString, mysql.raw(query.order_by), (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

const getHistoryAmount = (query) => {
  const queryString = "SELECT * FROM history WHERE model = ?";
  return new Promise((resolve, reject) => {
    db.query(queryString, mysql.raw(query.model), (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const postNewPopularity = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO popularity SET ?";
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
module.exports = {
  viewPopularVehicles,
  getHistoryAmount,
  postNewPopularity,
};
