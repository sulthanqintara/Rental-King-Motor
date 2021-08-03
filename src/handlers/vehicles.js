const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helper/response");
const mysql = require("mysql");

const addNewVehicles = (req, res) => {
  const { body } = req;
  vehiclesModel
    .addNewVehicles(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getVehicles = (req, res) => {
  const { query } = req;
  vehiclesModel
    .getVehicles(query)
    .then((data) => responseHelper.success(res, 200, data))
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

module.exports = {
  addNewVehicles,
  getVehicles,
  deleteVehicles,
  patchByID,
};
