const db = require("../db/connection");

exports.fetchAllCorrectAnswers = () => {
  return db.select("*").from("correct");
};
