const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");
const answersRouter = require("./answers.router");
const registerRouter = require("./registers.router");
const correctRouter = require("./correct.router");
const newqRouter = require("./newq.router");

const { handle405Errors } = require("../error_handlers/index");

// apiRouter.all("/", handle405Errors);

apiRouter.use("/questions", questionsRouter);
apiRouter.use("/answers", answersRouter);
apiRouter.use("/register", registerRouter);
apiRouter.use("/correct", correctRouter);
apiRouter.use("/newq", newqRouter);

module.exports = apiRouter;
