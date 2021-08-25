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
        return responseHelper.error(res, 404, error);
      if (error === "Password Salah")
        return responseHelper.error(res, 401, error);
      else return responseHelper.error(res, 500, error);
    });
};

const register = (req, res) => {
  const { body, file, hostname } = req;
  userModel
    .createNewUser(body, file, hostname)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => {
      if (err === "E-mail sudah terdaftar!")
        return responseHelper.error(res, 404, err);
      else return responseHelper.error(res, 500, err);
    });
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
