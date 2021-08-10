const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helper/response");
const mysql = require("mysql");

const addNewVehicles = (req, res) => {
  const { body, files, hostname } = req;
  console.log(req.files[0].originalname);
  vehiclesModel
    .addNewVehicles(body, files, hostname)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getVehicles = (req, res) => {
  const { query, hostname } = req;
  vehiclesModel
    .getVehicles(query)
    .then(({ data, totalCount, currentPage, limit }) => {
      const totalData = totalCount[0].total_vehicles;
      const totalPage = Math.ceil(totalData / limit);
      const baseURL = `http://${hostname}:8000/vehicles`;
      const prevPage =
        currentPage > 1
          ? baseURL + `?page=${currentPage - 1}&limit=${limit}`
          : null;
      const nextPage =
        currentPage < totalPage
          ? baseURL + `?page=${currentPage + 1}&limit=${limit}`
          : null;
      const info = {
        totalData,
        currentPage,
        totalPage,
        nextPage,
        prevPage,
      };
      responseHelper.success(res, 200, data, info);
    })
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteVehicles = (req, res) => {
  const { body } = req;
  vehiclesModel
    .deleteVehicles(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const patchByID = (req, res) => {
  const { body } = req;
  let { params } = req;
  vehiclesModel
    .patchByID(body, params)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const popularVehicles = (req, res) => {
  const { params } = req;
  vehiclesModel
    .popularVehicles(params)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  addNewVehicles,
  getVehicles,
  deleteVehicles,
  patchByID,
  popularVehicles,
};
