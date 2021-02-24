const {
  fetchAnswers,
  fetchSingleQuestionAnswers,
} = require("../models/answers.model");

exports.getAllAnswers = (req, res, next) => {
  fetchAnswers()
    .then((answers) => {
      res.send({ answers });
    })
    .catch(next);
};

exports.getSingleQuestionAnswers = (req, res, next) => {
  const { questions_id } = req.params;

  fetchSingleQuestionAnswers(questions_id)
    .then((answer) => {
      res.send(answer);
    })
    .catch(next);
};
