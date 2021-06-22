const newqRouter = require("express").Router();
const { allTheQuiz } = require("../controllers/newq.controller");

newqRouter.route("/").get(allTheQuiz);

module.exports = newqRouter;
