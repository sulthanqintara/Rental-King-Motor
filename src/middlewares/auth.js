const jwt = require("jsonwebtoken");
const responseHelper = require("../helper/response");
const db = require("../database/mysql");
const bcrypt = require("bcrypt");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken) return responseHelper.error(res, 401, "Anda belum login!");
  const token = bearerToken.split(" ")[1];
  const query = `SELECT token FROM active_token WHERE token = "${token}"`;
  db.query(query, (err, result) => {
    if (err) return responseHelper.error(res, 500, err);
    if (!result.length)
      return responseHelper.error(res, 401, "Silahkan Login Kembali");
    next();
  });
};

const authAdmin = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, {}, (err, payload) => {
    if (err) return responseHelper.error(res, 401, err);
    req.payload = payload;
    console.log(payload.iss);
    bcrypt.compare(process.env.ISSUER_ADMIN, payload.iss, (err, result) => {
      if (err) return responseHelper.error(res, 500, err);
      if (!result) return responseHelper.error(res, 401, "Anda bukan Admin!");
      next();
    });
  });
};

const authSeller = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, {}, (err, payload) => {
    if (err) return responseHelper.error(res, 401, err);
    req.payload = payload;
    console.log(payload.iss);
    bcrypt.compare(
      process.env.ISSUER_ADMIN || process.env.ISSUER_SELLER,
      payload.iss,
      (err, result) => {
        if (err) return responseHelper.error(res, 500, err);
        if (!result)
          return responseHelper.error(res, 401, "Anda bukan Seller!");
        next();
      }
    );
  });
};

const authUser = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, {}, (err, payload) => {
    if (err) return responseHelper.error(res, 401, err);
    req.payload = payload;
    console.log(payload.iss);
    bcrypt.compare(
      process.env.ISSUER_ADMIN || process.env.ISSUER_USER,
      payload.iss,
      (err, result) => {
        if (err) return responseHelper.error(res, 500, err);
        if (!result) return responseHelper.error(res, 401, "Anda bukan User!");
        next();
      }
    );
  });
};
module.exports = { checkToken, authAdmin, authSeller, authUser };
