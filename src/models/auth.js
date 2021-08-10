const db = require("../database/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const getPassQuery = "SELECT id, name, password FROM users where email = ?";
    db.query(getPassQuery, email, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject("E-mail tidak terdaftar");
      bcrypt.compare(password, result[0].password, (err, compared) => {
        if (err) return reject(err);
        if (!compared) return reject("Password Salah");
        const payload = {
          name: result[0].name,
          id: result[0].id,
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 3600,
            issuer: "Admin",
          },
          (err, token) => {
            if (err) return reject(err);
            return resolve(token);
          }
        );
      });
    });
  });
};

module.exports = { login };
