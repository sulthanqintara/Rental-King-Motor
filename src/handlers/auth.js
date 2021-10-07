const userModel = require("../models/users");
const responseHelper = require("../helper/response");
const authModel = require("../models/auth");

const login = (req, res, next) => {
  const { body } = req;
  authModel
    .login(body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((error) => {
      if (error === 401)
        responseHelper.error(res, 401, "Invalid Email or Password");
      else responseHelper.error(res, 500, error);
    });
};

const register = (req, res) => {
  const { body, file, hostname } = req;
  userModel
    .createNewUser(body, file, hostname)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => {
      if (err === "E-mail sudah terdaftar!")
        return responseHelper.error(res, 409, err);
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

const checkToken = (req, res) => {
  authModel
    .checkToken(req)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => {
      if (err === "Anda belum login!")
        return responseHelper.error(res, 401, err);
      if (err === "Token Expired, Silahkan Login Kembali")
        return responseHelper.error(res, 403, err);
      if (err === "Silahkan Login Kembali")
        return responseHelper.error(res, 401, err);
      return responseHelper.error(res, 500, err);
    });
};

module.exports = {
  login,
  register,
  logout,
  clear,
  checkToken,
};
