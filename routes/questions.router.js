const questionsRouter = require("express").Router();
const { handle405Errors } = require("../error_handlers/index");
const {
  getAllQuestions,
  getSingleQuestion,
  getSingleQuestionsWithAnswers,
  getQuestionWithCorrectAnswer,
} = require("../controllers/questions.controller");

questionsRouter.route("/").get(getAllQuestions).all(handle405Errors);

questionsRouter.route("/:id").get(getSingleQuestion).all(handle405Errors);

questionsRouter
  .route("/:id/answers")
  .get(getSingleQuestionsWithAnswers)
  .all(handle405Errors);

questionsRouter
  .route("/:id/correct")
  .get(getQuestionWithCorrectAnswer)
  .all(handle405Errors);

module.exports = questionsRouter;
