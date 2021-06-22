const newqRouter = require("express").Router();
const {
  allTheQuiz,
  singleQEverything,
} = require("../controllers/newq.controller");

newqRouter.route("/").get(allTheQuiz);

newqRouter.route("/:id").get(singleQEverything);

module.exports = newqRouter;
