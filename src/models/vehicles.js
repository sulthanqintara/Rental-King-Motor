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
    let search = "v.model";
    let keyword = "";
    let order_by = "v.id";
    let sort = "ASC";
    let filter = "v.id > 0";
    if (query?.search) search = query.search;
    if (query?.keyword) keyword = query.keyword;
    if (query?.order_by && query?.sort) {
      order_by = query.order_by;
      sort = query.sort;
    }
    if (query?.filter) filter = query.filter;
    let queryString = `SELECT v.id, vt.name_idn AS "kategori", vt.name_en AS "category", v.model, v.location, v.price, v.amount_available FROM vehicles v JOIN vehicle_types vt ON v.type_id = vt.id WHERE ${search} LIKE "%${keyword}%" AND ${filter} ORDER BY ${order_by} ${sort}`;
    console.log(queryString);
    db.query(queryString, (error, result) => {
      console.log(search, keyword);
      if (error) return reject(error);
      return resolve(result);
    });
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
