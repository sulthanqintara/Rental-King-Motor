const bcrypt = require("bcrypt");
const db = require("../database/mysql");
const { v4: uuidv4 } = require("uuid");

const createNewUser = (body, file, hostname) => {
  return new Promise((resolve, reject) => {
    let input = "";

    if (file) {
      input = `/img/${file.filename}`;
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
                uuid: uuidv4(),
                input,
              })
            : (userData = {
                ...body,
                uuid: uuidv4(),
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
        const imageUrl = `/img/${file.filename}`;
        input = {
          profile_picture: imageUrl,
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
        const getUserQuery = "SELECT * FROM users WHERE id = ?";
        db.query(getUserQuery, id, (err, userData) => {
          if (err) return reject(err);
          const userInfo = {
            user_id: userData[0].id,
            userName: userData[0].name,
            authLevel: Number(userData[0].auth_level),
            phone: userData[0].phone_number,
            email: userData[0].email,
            address: userData[0].address,
            dob: userData[0].DOB,
            gender: userData[0].gender,
            profilePic: userData[0].profile_picture,
          };
          return resolve(userInfo);
        });
      });
    });
  });
};

const forgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const getEmailQuery = "SELECT id FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject(404);
      const min = Math.ceil(111111);
      const max = Math.floor(999999);
      const code = Math.floor(Math.random() * (max - min) + min);
      const postCodeQuery =
        "INSERT INTO forgot_password (user_id, code) VALUES (? ,?)";
      db.query(postCodeQuery, [result[0].id, code], (err, res) => {
        if (err) return reject(err);
        return resolve("Code sent to database");
      });
    });
  });
};

const checkForgotCode = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email } = body;
    const getEmailQuery = "SELECT id FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      const id = result[0]?.id;
      const checkCodeQuery =
        "SELECT code FROM forgot_password WHERE id = (SELECT max(id) FROM forgot_password) AND user_id = ? AND code = ?";
      db.query(checkCodeQuery, [id, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        return resolve("Code is valid");
      });
    });
  });
};

const changePassword = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email, password } = body;
    const getEmailQuery = "SELECT id FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      const id = result[0].id;
      const checkCodeQuery =
        "SELECT code FROM forgot_password WHERE id = (SELECT max(id) FROM forgot_password) AND user_id = ? AND code = ?";
      db.query(checkCodeQuery, [id, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        const updatePassQuery = "UPDATE users SET ? WHERE email = ?";
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) return reject(err);
          const newPassword = {
            password: hash,
          };
          db.query(updatePassQuery, [newPassword, email], (err, result) => {
            if (err) return reject(err);
            return resolve("Password sudah diganti");
          });
        });
      });
    });
  });
};

module.exports = {
  createNewUser,
  updatePassword,
  editUser,
  forgotPassword,
  changePassword,
  checkForgotCode,
};
