const {
  fetchAllQuestions,
  fetchQuestion,
  fetchQwithAs,
  fetchQwithCorrectA,
} = require("../models/questions.model");

exports.getAllQuestions = (req, res, next) => {
  fetchAllQuestions()
    .then((questions) => {
      res.send({ questions });
    })
    .catch(next);
};

exports.getSingleQuestion = (req, res, next) => {
  const { id } = req.params;
  fetchQuestion(id)
    .then((question) => {
      res.send({ question });
    })
    .catch(next);
};

exports.getSingleQuestionsWithAnswers = (req, res, next) => {
  const { id } = req.params;
  fetchQwithAs(id)
    .then((question) => {
      res.send({ question });
    })
    .catch(next);
};

exports.getQuestionWithCorrectAnswer = (req, res, next) => {
  const { id } = req.params;
  fetchQwithCorrectA(id)
    .then((question) => {
      res.send(question);
    })
    .catch(next);
};
