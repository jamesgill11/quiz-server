const {
  fetchEverything,
  fetchSingleqEverything,
} = require("../models/newq.model");

exports.allTheQuiz = (req, res, next) => {
  fetchEverything()
    .then((allQuiz) => {
      res.send({ allQuiz });
    })
    .catch(next);
};

exports.singleQEverything = (req, res, next) => {
  const { id } = req.params;
  fetchSingleqEverything(id).then((question) => {
    res.send({ question });
  });
};
