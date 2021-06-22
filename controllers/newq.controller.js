const { fetchEverything } = require("../models/newq.model");

exports.allTheQuiz = (req, res, next) => {
  fetchEverything()
    .then((allQuiz) => {
      res.send({ allQuiz });
    })
    .catch(next);
};
