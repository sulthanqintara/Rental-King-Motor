const db = require("../database/mysql");
const mysql = require("mysql");

const postNewHistory = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO history SET ?";
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getHistory = (query) => {
  return new Promise((resolve, reject) => {
    let filter = "";
    let inputValue = "";
    let order_by = "";
    let sort = "";
    let queryString = `SELECT h.id, u.user_name AS "renter", v.model AS "model", h.prepayment, h.returned_status, h.rent_start_date, h.rent_finish_date FROM history h JOIN users u ON h.renter_id = u.id JOIN vehicles v ON h.model = v.id`;
    const queryFilter = " WHERE ?";
    const querySort = " ORDER BY ? ?";
    const queryFind = " LIKE '%?%'";
    if (query?.filter) {
      queryString += queryFilter;
      filter = mysql.raw(query.filter);
    }
    if (query?.keyword) {
      queryString += queryFind;
      inputValue = mysql.raw(query.keyword);
    }
    if (query?.order_by && query?.sort) {
      order_by = mysql.raw(query.order_by);
      sort = mysql.raw(query.sort);
      queryString += querySort;
    }
    db.query(
      queryString,
      [filter, inputValue, order_by, sort],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

const deleteHistory = (query) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM history WHERE ?";
    db.query(queryString, query, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  postNewHistory,
  getHistory,
  deleteHistory,
};
