const userModel = require("../models/users");
const responseHelper = require("../helper/response");
const authModel = require("../models/auth");

const login = (req, res) => {
  const { body } = req;
  authModel
    .login(body)
    .then((result) => responseHelper.success(res, 200, { token: result }))
    .catch((error) => responseHelper.error(res, 500, error));
};

const register = (req, res) => {
  const { body } = req;
  userModel
    .createNewUser(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const logout = (req, res) => {};

module.exports = {
  login,
  register,
  logout,
};
