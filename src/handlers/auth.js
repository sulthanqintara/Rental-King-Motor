const userModel = require("../models/users");
const responseHelper = require("../helper/response");
const authModel = require("../models/auth");

const login = (req, res, next) => {
  const { body } = req;
  authModel
    .login(body)
    .then((result) => responseHelper.success(res, 200, { token: result }))
    .catch((error) => {
      if (error === "E-mail tidak terdaftar")
        responseHelper.error(res, 404, error);
      if (error === "Password Salah") responseHelper.error(res, 401, error);
      if (error === "No Authorization!") responseHelper.error(res, 401, error);
      else responseHelper.error(res, 500, error);
    });
};

const register = (req, res) => {
  const { body, file, hostname } = req;
  userModel
    .createNewUser(body, file, hostname)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const logout = (req, res) => {
  authModel
    .logout(req)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

const clear = (req, res) => {
  authModel
    .clear(req)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  login,
  register,
  logout,
  clear,
};
