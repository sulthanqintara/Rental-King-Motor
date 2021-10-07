const userModel = require("../models/users");
const responseHelper = require("../helper/response");

const updatePassword = (req, res) => {
  const { body, params } = req;
  userModel
    .updatePassword(body, params.id)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => {
      if (err === "Password tidak sama") responseHelper.error(res, 403, err);
      else responseHelper.error(res, 500, err);
    });
};

const editUser = (req, res) => {
  const { file, params, body, hostname } = req;
  userModel
    .editUser(file, params.id, body, hostname)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

const forgotPassword = (req, res) => {
  const { body } = req;
  userModel
    .forgotPassword(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, 404, "Email not found");
      }
      return responseHelper.error(res, 500, err);
    });
};

const checkForgotPassword = (req, res) => {
  const { body } = req;
  userModel
    .checkForgotCode(body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, 404, "Code is invalid");
      }
      return responseHelper.error(res, 500, err);
    });
};

const changePassword = (req, res) => {
  const { body } = req;
  userModel
    .changePassword(body)
    .then((result) =>
      responseHelper.success(res, 200, "Password Has Been Changed!")
    )
    .catch((err) => {
      responseHelper.error(res, 500, err);
    });
};

module.exports = {
  updatePassword,
  editUser,
  forgotPassword,
  checkForgotPassword,
  changePassword,
};
