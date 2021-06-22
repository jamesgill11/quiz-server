const db = require("../db/connection");

exports.fetchEverything = () => {
  return db.select("*").from("newq");
};

exports.fetchSingleqEverything = (id) => {
  return db
    .select("*")
    .from("newq")
    .where("q_id", id)
    .then((res) => {
      const [question] = res;

      return question;
    });
};
