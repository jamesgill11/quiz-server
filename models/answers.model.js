const db = require("../db/connection");

exports.fetchAnswers = () => {
  return db.select("*").from("answers");
};

exports.fetchSingleQuestionAnswers = (question_id) => {
  return db
    .select("*")
    .from("answers")
    .where("question_id", question_id)
    .returning("*")
    .then((res) => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "404 Error: Not found" });
      }
      return res;
    });
};
