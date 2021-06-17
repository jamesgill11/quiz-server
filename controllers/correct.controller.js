const { fetchAllCorrectAnswers } = require("../models/correct.model");

exports.getAllCorrectAnswers = (req, res, next) => {
  fetchAllCorrectAnswers()
    .then((correctAnswer) => {
      res.send({ correctAnswer });
    })
    .catch(next);
};
