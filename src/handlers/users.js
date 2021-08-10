const userModel = require("../models/users");
const responseHelper = require("../helper/response");

const updatePassword = (req, res) => {
  const { body, params } = req;
  userModel
    .updatePassword(body, params.id)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

const editUser = (req, res) => {
  const { file, params, body, hostname } = req;
  userModel
    .editUser(file, params.id, body, hostname)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  updatePassword,
  editUser,
};
