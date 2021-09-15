const bcrypt = require("bcrypt");
const db = require("../database/mysql");

const createNewUser = (body, file, hostname) => {
  return new Promise((resolve, reject) => {
    let input = "";

    if (file) {
      input = `http://${hostname}:8000/img/${file.filename}`;
    }
    const { email } = body;
    const getQuery = "SELECT * FROM users WHERE email = ?";
    db.query(getQuery, email, (err, result) => {
      if (err) return reject(err);
      if (result.length) return reject("E-mail sudah terdaftar!");
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) return reject(err);
          let userData = {};
          input !== ""
            ? (userData = {
                ...body,
                password: hash,
                input,
              })
            : (userData = {
                ...body,
                password: hash,
              });
          const query = "INSERT INTO users SET ?";
          db.query(query, userData, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      });
    });
  });
};

const updatePassword = (body, id) => {
  return new Promise((resolve, reject) => {
    const { oldPass, newPass } = body;
    const getPassQuery = "SELECT password FROM users WHERE id = ?";
    const updateQuery = "UPDATE users SET ? WHERE id = ?";
    db.query(getPassQuery, id, (err, res) => {
      if (err) return reject(err);
      bcrypt.compare(oldPass, res[0].password, (err, result) => {
        if (err) return reject(err);
        if (!result) return reject("Password tidak sama");
        bcrypt.hash(newPass, 10, (err, hash) => {
          if (err) return reject(err);
          const newPassword = {
            password: hash,
          };
          db.query(updateQuery, [newPassword, id], (err, result) => {
            if (err) return reject(err);
            return resolve("Password sudah diganti");
          });
        });
      });
    });
  });
};

const editUser = (file, id, body, hostname) => {
  return new Promise((resolve, reject) => {
    const getFileQuery = "SELECT profile_picture FROM users WHERE id = ?";
    db.query(getFileQuery, id, (err, dbUrl) => {
      let input;
      if (err) return reject(err);
      if (file) {
        const host = `http://${hostname}:8000`;
        const imageUrl = `/img/${file.filename}`;
        input = {
          profile_picture: host + imageUrl,
        };
      }
      if (!file)
        input = {
          profile_picture: dbUrl[0]?.profile_picture,
        };
      const newBody = { ...body, ...input };
      const updateQuery = "UPDATE users SET ? WHERE id = ?";
      db.query(updateQuery, [newBody, id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  });
};

module.exports = {
  createNewUser,
  updatePassword,
  editUser,
};
