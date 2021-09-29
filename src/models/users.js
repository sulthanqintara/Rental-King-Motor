const bcrypt = require("bcrypt");
const db = require("../database/mysql");

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

module.exports = {
  createNewUser,
  updatePassword,
  editUser,
};
