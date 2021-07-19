const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.sendAuth = (user_email, user_password) => {
  return db
    .select("*")
    .from("users")
    .where("user_email", user_email)
    .returning("*")
    .then((res) => {
      return res;
    });
};

exports.authRefToken = (user_email) => {};
