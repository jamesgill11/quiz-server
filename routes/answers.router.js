const answersRouter = require("express").Router();
const { handle405Errors } = require("../error_handlers/index");
const {
  getAllAnswers,
  getSingleQuestionAnswers,
} = require("../controllers/answers.controller");

answersRouter.route("/").get(getAllAnswers).all(handle405Errors);

answersRouter
  .route("/:questions_id")
  .get(getSingleQuestionAnswers)
  .all(handle405Errors);

module.exports = answersRouter;
