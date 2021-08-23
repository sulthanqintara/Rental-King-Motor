const db = require("../database/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const getPassQuery =
      "SELECT id, name, password, auth_level FROM users where email = ?";
    db.query(getPassQuery, email, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject("E-mail tidak terdaftar");
      const authLevel = Number(result[0].auth_level);
      bcrypt.compare(password, result[0].password, (err, compared) => {
        if (err) return reject(err);
        if (!compared) return reject("Password Salah");
        const payload = {
          name: result[0].name,
          id: result[0].id,
          authLevel,
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 3600,
            issuer: "RKM DB",
          },
          (err, token) => {
            if (err) return reject(err);
            const queryPostToken = `INSERT INTO active_token (token, time_issued) VALUES ("${token}",${Date.now()})`;
            db.query(queryPostToken, (err, result) => {
              if (err) return reject(err);
              return resolve(token);
            });
          }
        );
      });
    });
  });
};

const logout = (req) => {
  return new Promise((resolve, reject) => {
    const { body } = req;
    const queryDelete = `DELETE FROM active_token WHERE token = "${body.token}"`;
    db.query(queryDelete, (err, result) => {
      if (err) return reject(err);
      return resolve("Anda berhasil Log Out");
    });
  });
};

const clear = (req) => {
  return new Promise((resolve, reject) => {
    const queryClear = `DELETE FROM active_token WHERE ${Date.now()}-time_issued>60*60*1000`;
    db.query(queryClear, (err, result) => {
      if (err) return reject(err);
      return resolve("Expired Token Cleared!");
    });
  });
};

module.exports = { login, logout, clear };
