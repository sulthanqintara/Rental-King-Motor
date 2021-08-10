const jwt = require("jsonwebtoken");
const responseHelper = require("../helper/response");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken) return responseHelper.error(res, 401, "Anda belum login!");
  const token = bearerToken.split(" ")[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    { issuer: "Admin" },
    (err, payload) => {
      if (err) return responseHelper.error(res, 401, err);
      req.payload = payload;
      next();
    }
  );
};

module.exports = { checkToken };
