const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helper/response");
const mysql = require("mysql");

const addNewVehicles = (req, res) => {
  vehiclesModel
    .addNewVehicles(req)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getVehicles = (req, res) => {
  const { query, hostname } = req;
  vehiclesModel
    .getVehicles(query)
    .then(
      ({ result, totalData, totalPage, currentPage, prevPage, nextPage }) => {
        const info = {
          data: result,
          totalData,
          totalData,
          totalPage,
          currentPage,
          prevPage,
          nextPage,
        };
        responseHelper.success(res, 200, info);
      }
    )
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
  vehiclesModel
    .patchByID(req)
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
