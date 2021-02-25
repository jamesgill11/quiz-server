const db = require("../db/connection");

exports.fetchAllQuestions = () => {
  return db.select("*").from("questions");
};

exports.fetchQuestion = (id) => {
  return db
    .select("*")
    .from("questions")
    .where("questions.id", id)
    .returning("*")
    .then((res) => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "404 Error: Not found" });
      } else {
        const [question] = res;
        return question;
      }
    });
};

exports.fetchQwithAs = (id) => {
  return db
    .select("question", "answers.a", "answers.b", "answers.c", "answers.d")
    .from("questions")
    .where("answers.id", id)
    .leftJoin("answers", "questions.id", "answers.id")
    .then((res) => {
      if (res.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else {
        const [question] = res;

        return question;
      }
    });
};

exports.fetchQwithCorrectA = (id) => {
  return db
    .select("question", "correct.correctAnswer")
    .from("questions")
    .where("correct.correct_question_id", id)
    .leftJoin("correct", "questions.id", "correct.correct_question_id")
    .then((res) => {
      return res;
    });
};
