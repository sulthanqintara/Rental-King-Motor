const socket = require("../../index");
const db = require("../database/mysql");

const getChatById = (query) => {
  return new Promise((resolve, reject) => {
    const sender = query.sender_id;
    const receiver = query.receiver_id;
    const queryString =
      "SELECT * FROM chat WHERE (user_id_sender = ? AND user_id_receiver = ?) OR (user_id_sender = ? AND user_id_receiver = ?) ORDER BY timestamp ASC";
    db.query(
      queryString,
      [sender, receiver, receiver, sender],
      (err, result) => {
        if (err) return reject(err);
        if (!result[0]) return reject(404);
        return resolve(result);
      }
    );
  });
};

const postChat = (body) => {
  return new Promise((resolve, reject) => {
    const senderId = body.user_id_sender;
    const receiverId = body.user_id_receiver;
    const getLatestChatId = `SELECT MAX(id) AS latest_id FROM chat WHERE (user_id_sender = ? or user_id_receiver = ?) AND (user_id_sender = ? or user_id_receiver = ?)`;
    db.query(
      getLatestChatId,
      [senderId, senderId, receiverId, receiverId],
      (err, result) => {
        if (err) return reject(err);
        const patchLatestChat = `UPDATE chat SET isLatest = 0 WHERE id = ?`;
        db.query(patchLatestChat, result[0].latest_id, (err, result) => {
          if (err) return reject(err);
          const newBody = { ...body, ...{ isLatest: 1 } };
          const queryString = `INSERT INTO chat SET ?`;
          db.query(queryString, newBody, (err, result) => {
            if (err) return reject(err);
            const queryGetUserName = `SELECT name, uuid FROM users WHERE id = ?`;
            db.query(queryGetUserName, senderId, (err, userName) => {
              const senderName = userName[0].name;
              socket.ioObject.emit(receiverId, {
                message: body.message,
                senderName,
              });
              return resolve("Chat Sent to db");
            });
          });
        });
      }
    );
  });
};

const getLatestChat = (params) => {
  return new Promise((resolve, reject) => {
    const userId = params.id;
    const queryString =
      "SELECT c.id , c.user_id_sender, c.user_id_receiver, us.name AS sender_name , ur.name AS receiver_name, us.profile_picture AS sender_profile_picture, ur.profile_picture AS receiver_profile_picture, c.message FROM chat c JOIN users us ON c.user_id_sender = us.id JOIN users ur ON c.user_id_receiver = ur.id WHERE (c.user_id_sender = ? OR c.user_id_receiver = ?) AND c.isLatest = 1";
    db.query(queryString, [userId, userId], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = { getChatById, postChat, getLatestChat };
