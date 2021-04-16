const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");
const answersRouter = require("./answers.router");
const registerRouter = require("./registers.router");

const { handle405Errors } = require("../error_handlers/index");

// apiRouter.all("/", handle405Errors);

apiRouter.use("/questions", questionsRouter);
apiRouter.use("/answers", answersRouter);
apiRouter.use("/register", registerRouter);

module.exports = apiRouter;
