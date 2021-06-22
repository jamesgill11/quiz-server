const db = require("../db/connection");

exports.fetchEverything = () => {
  return db.select("*").from("newq");
};
