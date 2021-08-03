const db = require("../database/mysql");
const mysql = require("mysql");

const addNewVehicles = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO vehicles SET ?";
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getVehicles = (query) => {
  return new Promise((resolve, reject) => {
    let filter = "";
    let keyword = "";
    let order_by = "";
    let sort = "";
    let queryString = `SELECT v.id, vt.name_idn AS "kategori", vt.name_en AS "category", v.model, v.location, v.price, v.amount_available FROM vehicles v JOIN vehicle_types vt ON v.type = vt.id`;
    const queryFilter = " WHERE ?";
    const querySort = " ORDER BY ? ?";
    const queryFind = " LIKE '%?%'";

    if (query?.filter) {
      queryString += queryFilter;
      filter = mysql.raw(query.filter);
    }
    if (query?.keyword) {
      queryString += queryFind;
      keyword = mysql.raw(query.keyword);
    }
    if (query?.order_by && query?.sort) {
      order_by = mysql.raw(query.order_by);
      sort = mysql.raw(query.sort);
      queryString += querySort;
    }
    db.query(
      queryString,
      [filter, keyword, order_by, sort],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

const deleteVehicles = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM vehicles WHERE ?";
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const patchByID = (body, params) => {
  let id = params.id;
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE vehicles SET ? WHERE id = ?";
    db.query(queryString, [body, id], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  addNewVehicles,
  getVehicles,
  deleteVehicles,
  patchByID,
};
