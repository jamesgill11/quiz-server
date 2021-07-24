const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");
const answersRouter = require("./answers.router");
const registerRouter = require("./registers.router");
const correctRouter = require("./correct.router");
const newqRouter = require("./newq.router");
const { loginRouter, rfTokenRouter } = require("./login.router");
const { authenticateToken } = require("../middleware/authorization");
const { handle405Errors } = require("../error_handlers/index");

apiRouter.use("/questions", questionsRouter);
apiRouter.use("/answers", answersRouter);
apiRouter.use("/register", registerRouter);
apiRouter.use("/correct", correctRouter);
apiRouter.use("/newq", authenticateToken, newqRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/refresh_token", rfTokenRouter);

module.exports = apiRouter;
