const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
require("dotenv").config();
const apiRouter = require("./routes/api.router");
const {
  customErrorHandler,
  handlePSQLErrors,
  handle405Errors,
  handleServerErrors,
} = require("./error_handlers/index");
const axios = require("axios");
// const crossOrigin = require("./middleware/cors");
// const corsOptions = { credentials: true, origin: process.env.URL || `*` };
app.use(cors());
app.post(`:endpoint([\\/\\w\\.]*)`, (req, res, next) => {
  let endpoint =
    `https://my-quiz-server.herokuapp.com/api` + req.params.endpoint;

  axios
    .post(endpoint)
    .then((res) => {
      res.json(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRouter);

app.use("/", (req, res, next) => {
  res.send({ status: 200, msg: "Welcome to my Quiz" });
});

app.use("*", (req, res, next) => {
  next({ status: 404, msg: "Route not found" });
});

app.use(customErrorHandler);
app.use(handlePSQLErrors);
app.use(handle405Errors);
app.use(handleServerErrors);

module.exports = app;
