const {
  fetchEverything,
  fetchSingleqEverything,
} = require("../models/newq.model");
const { authenticateToken } = require("../middleware/authorization");

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
