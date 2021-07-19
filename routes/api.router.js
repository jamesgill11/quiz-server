const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");
const answersRouter = require("./answers.router");
const registerRouter = require("./registers.router");
const correctRouter = require("./correct.router");
const newqRouter = require("./newq.router");
const { loginRouter, rfTokenRouter } = require("./login.router");

const { handle405Errors } = require("../error_handlers/index");
const { authenticateToken } = require("../middleware/authorization");
const cors = require("cors");
// apiRouter.all("/", handle405Errors);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

apiRouter.use("/questions", questionsRouter);
apiRouter.use("/answers", answersRouter);
apiRouter.use("/register", registerRouter);
apiRouter.use("/correct", correctRouter);
apiRouter.use("/newq", authenticateToken, cors(corsOptions), newqRouter);
apiRouter.use("/login", cors(corsOptions), loginRouter);
apiRouter.use("/refresh_token", cors(corsOptions), rfTokenRouter);

module.exports = apiRouter;
