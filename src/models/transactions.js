const db = require("../database/mysql");
const crypto = require("crypto");

const postNewTransaction = (body, query) => {
  return new Promise((resolve, reject) => {
    const randomString = crypto
      .randomBytes(10)
      .toString("hex")
      .split("", 7)
      .join("");
    const data = { ...body, booking_code: `#${randomString.toUpperCase()}` };
    const queryString = "INSERT INTO transactions SET ?";
    db.query(queryString, data, (err, result) => {
      if (err) return reject(err);
      return resolve(result.insertId);
    });
  });
};
const patchNewTransaction = (body) => {
  return new Promise((resolve, reject) => {
    console.log(body);
    const queryString = "UPDATE transactions SET ? WHERE id = ?";
    db.query(queryString, [body, body.id], (err, result) => {
      if (err) return reject(err);
      return resolve("Transaction Has Been Patched");
    });
  });
};

const getTransactions = (query) => {
  return new Promise((resolve, reject) => {
    let user_id = query?.user_id ? `= ${query.user_id} ` : ">= 0";
    let ownerId = query?.owner_id ? `= ${query.owner_id}` : ">= 0";
    let keyword = query?.keyword ? query.keyword : "";
    let order_by = query?.order_by ? query.order_by : "t.id";
    let sort = query?.sort ? query.sort : "ASC";
    let filterByModel = query?.filter_by_model
      ? `= ${query.filter_by_model}`
      : ">= 0";
    let filterByDate = query?.filter_date
      ? String(query.filter_date)
      : "0000-00-00";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = limit * (page - 1);

    let queryString = `SELECT t.id, u.id AS "renter_id", u.name AS "renter", v.owner AS "owner_id", v.model AS "model", v.id AS "model_id", t.prepayment, t.id_card, t.amount_rented, t.user_paid_status, t.seller_paid_status, t.booking_code, t.rent_start_date, t.rent_finish_date, t.returned_status, t.time_posted, v.picture FROM transactions t JOIN users u ON t.user_id = u.id JOIN vehicles v ON t.model_id = v.id WHERE user_id ${user_id} AND v.owner ${ownerId} AND v.model LIKE "%${keyword}%" AND v.type_id ${filterByModel} AND t.rent_start_date >= ? ORDER BY ${order_by} ${sort} LIMIT ${limit} OFFSET ${offset}`;

    db.query(queryString, filterByDate, (error, result) => {
      if (error) return reject(error);
      if (!result.length) return reject(404);
      return resolve({
        data: result,
        currentPage: page,
        limit,
      });
    });
  });
};

const getTransactionsById = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT t.id, t.user_id, u.name, u.phone_number, u.email, t.model_id, t.amount_rented, t.prepayment, t.payment_method, t.payment_method, t.payment_code, t.user_paid_status, t.booking_code, t.seller_paid_status, t.rent_start_date, t.rent_finish_date, t.time_posted, v.owner AS owner_id FROM transactions t JOIN users u ON u.id = t.user_id JOIN vehicles v ON v.id = t.model_id WHERE t.id = ?`;
    db.query(queryString, id, (err, result) => {
      if (err) return reject(err);
      return resolve(result[0]);
    });
  });
};

const getLatestTransactionsID = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString =
      "SELECT MAX(id) AS latest_id FROM transactions WHERE user_id = ?";
    db.query(queryString, id, (err, result) => {
      if (err) return reject(err);
      return resolve(result[0]);
    });
  });
};

const deleteTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM transactions WHERE id = ?";
    db.query(queryString, body.id, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  postNewTransaction,
  patchNewTransaction,
  getTransactions,
  getTransactionsById,
  deleteTransaction,
  getLatestTransactionsID,
};
