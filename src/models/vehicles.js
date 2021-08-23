const db = require("../database/mysql");

const addNewVehicles = (req) => {
  return new Promise((resolve, reject) => {
    const { body, files, hostname } = req;
    let picture = "";
    if (files) {
      for (let i = 0; i < files.length; i++) {
        picture += `http://${hostname}:8000/img/${files[i].filename}, `;
      }
    }
    let input = {
      picture,
    };
    const queryString = "INSERT INTO vehicles SET ? , ?";
    db.query(queryString, [body, input], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getVehicles = (query) => {
  return new Promise((resolve, reject) => {
    const search = query?.search ? query.search : "v.model";
    let keyword = "";
    let order_by = "v.id";
    let sort = "ASC";
    let filter = "v.id > 0";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 3;
    const offset = limit * (page - 1);
    if (query?.keyword) keyword = query.keyword;
    if (query?.order_by && query?.sort) {
      order_by = query.order_by;
      sort = query.sort;
    }
    if (query?.filter) filter = query.filter;
    let queryString = `SELECT v.id, vt.name_idn AS "kategori", vt.name_en AS "category", v.model, v.location, v.price, v.amount_available, v.picture FROM vehicles v JOIN vehicle_types vt ON v.type_id = vt.id WHERE ${search} LIKE "%${keyword}%" AND ${filter} ORDER BY ${order_by} ${sort} LIMIT ${limit} OFFSET ${offset}`;
    let queryCount = `SELECT COUNT(*) AS "total_vehicles" FROM vehicles`;
    db.query(queryString, (error, result) => {
      if (error) return reject(error);
      if (!result.length) return reject(404);
      db.query(queryCount, (err, resultTotal) => {
        if (err) return reject(err);
        return resolve({
          data: result,
          totalCount: resultTotal,
          currentPage: page,
          limit,
        });
      });
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

const patchByID = (req) => {
  const { body, params, files, hostname } = req;
  let id = params.id;
  let picture = "";
  if (files) {
    for (let i = 0; i < files.length; i++) {
      picture += `http://${hostname}:8000/img/${files[i].filename}, `;
    }
  }
  let input = {
    picture,
  };
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE vehicles SET ? , ? WHERE id = ?";
    db.query(queryString, [body, input, id], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const popularVehicles = (params) => {
  const queryGet = `SELECT COUNT(model_id) FROM history WHERE model_id = ${params.id}`;
  return new Promise((resolve, reject) => {
    db.query(queryGet, (err, result) => {
      if (err) return reject(err);
      const { "COUNT(model_id)": amount } = result[0];
      console.log(amount);
      const queryUpdate = `UPDATE vehicles SET popular_stats = ${amount} WHERE id = ${params.id}`;
      db.query(queryUpdate, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  });
};

module.exports = {
  addNewVehicles,
  getVehicles,
  deleteVehicles,
  patchByID,
  popularVehicles,
};
