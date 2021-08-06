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
    let search = "h.id";
    let keyword = "";
    let order_by = "h.id";
    let sort = "ASC";
    let filter = "h.id > 0";
    if (query?.search) search = query.search;
    if (query?.keyword) keyword = query.keyword;
    if (query?.order_by && query?.sort) {
      order_by = query.order_by;
      sort = query.sort;
    }
    if (query?.filter) filter = query.filter;
    let queryString = `SELECT h.id, u.name AS "renter", v.model AS "model", h.prepayment, h.returned_status, h.rent_start_date, h.rent_finish_date FROM history h JOIN users u ON h.user_id = u.id JOIN vehicles v ON h.model_id = v.id WHERE ${search} LIKE "%${keyword}%" AND ${filter} ORDER BY ${order_by} ${sort}`;

    db.query(queryString, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
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
