const db = require("../database/mysql");

const addNewVehicles = (req) => {
  return new Promise((resolve, reject) => {
    const { body, files, hostname } = req;
    let picture = "";
    if (files.length === 0) {
      picture = "/img/imagePlaceholder.png";
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        picture += `/img/${files[i].filename}${files.length > 1 ? "," : ""}`;
      }
    }
    let input = {
      picture,
    };
    const inputWithoutPic = { ...body };
    const inputWithPic = { ...body, ...input };
    let newInput = {};
    if (!picture) {
      newInput = inputWithoutPic;
    } else {
      newInput = inputWithPic;
    }

    const queryString = "INSERT INTO vehicles SET ?";
    db.query(queryString, newInput, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getVehicles = (query) => {
  return new Promise((resolve, reject) => {
    const idVehicle = query?.id ? "=" + query.id : "> 1";
    let keyword = query?.keyword ? query.keyword : "";
    let location = query?.location ? query?.location : "";
    let filter = query?.filter_by_type ? `= ${query.filter_by_type}` : "> 0";
    let minPrice = query?.min_price ? query.min_price : 0;
    let maxPrice = query?.max_price ? query.max_price : 999999999;
    let order_by = query?.order_by ? query?.order_by : "v.id";
    let sort = query?.sort ? query?.sort : "ASC";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 4;
    const offset = limit * (page - 1);

    let queryString = `SELECT v.id, vt.name_idn AS "kategori", vt.name_en AS "category", v.model, v.location, v.price, v.amount_available, v.picture, v.popular_stats, v.owner FROM vehicles v JOIN vehicle_types vt ON v.type_id = vt.id WHERE v.model LIKE "%${keyword}%" AND v.type_id ${filter} AND v.id ${idVehicle} AND v.location LIKE "%${location}%" AND v.price >= ${minPrice} AND v.price <= ${maxPrice} ORDER BY ${order_by} ${sort} LIMIT ${limit} OFFSET ${offset}`;

    let queryCount = `SELECT COUNT(v.id) AS "total_vehicles" FROM vehicles v JOIN vehicle_types vt ON v.type_id = vt.id WHERE v.model LIKE "%${keyword}%" AND v.type_id ${filter} AND v.id ${idVehicle} AND v.location LIKE "%${location}%" ORDER BY ${order_by} ${sort}`;

    db.query(queryString, (error, result) => {
      if (error) return reject(error);
      if (!result.length) return reject(404);
      db.query(queryCount, (err, totalResult) => {
        if (err) return reject(err);
        const totalData = totalResult[0].total_vehicles;
        const totalPage = Math.ceil(totalData / limit);
        const baseURL = `/vehicles?limit=${limit}&`;
        let urlPrevPage = baseURL;
        let urlNextPage = baseURL;
        query.keyword &&
          ((urlPrevPage = urlPrevPage + `keyword=${keyword}&`),
          (urlNextPage = urlNextPage + `keyword=${keyword}&`));
        query.location &&
          ((urlPrevPage = urlPrevPage + `location=${location}&`),
          (urlNextPage = urlNextPage + `location=${location}&`));
        query.filter_by_type &&
          ((urlPrevPage = urlPrevPage + `filter_by_type=${filter}&`),
          (urlNextPage = urlNextPage + `filter_by_type=${filter}&`));
        query.min_price &&
          ((urlPrevPage = urlPrevPage + `min_price=${minPrice}&`),
          (urlNextPage = urlNextPage + `min_price=${minPrice}&`));
        query.max_price &&
          ((urlPrevPage = urlPrevPage + `max_price=${maxPrice}&`),
          (urlNextPage = urlNextPage + `max_price=${maxPrice}&`));
        query.order_by &&
          ((urlPrevPage = urlPrevPage + `order_by=${order_by}&`),
          (urlNextPage = urlNextPage + `order_by=${order_by}&`));
        query.sort &&
          ((urlPrevPage = urlPrevPage + `sort=${sort}&`),
          (urlNextPage = urlNextPage + `sort=${sort}&`));

        const prevPage = page > 1 ? urlPrevPage + `page=${page - 1}` : null;
        const nextPage =
          page < totalPage ? urlNextPage + `page=${page + 1}` : null;
        return resolve({
          result,
          totalData,
          totalPage,
          currentPage: page,
          prevPage,
          nextPage,
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
      picture += `/img/${files[i].filename},`;
    }
  }
  let input = {
    picture,
  };
  const inputWithoutPic = { ...body };
  const inputWithPic = { ...body, ...input };
  let newInput = {};
  if (!picture) {
    newInput = inputWithoutPic;
  } else {
    newInput = inputWithPic;
  }

  return new Promise((resolve, reject) => {
    const queryString = "UPDATE vehicles SET ? WHERE id = ?";
    db.query(queryString, [newInput, id], (err, result) => {
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
