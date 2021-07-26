const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: true,
  })
);
const cookieParser = require("cookie-parser");
require("dotenv").config();
const apiRouter = require("./routes/api.router");
const {
  customErrorHandler,
  handlePSQLErrors,
  handle405Errors,
  handleServerErrors,
} = require("./error_handlers/index");
// const crossOrigin = require("./middleware/cors");

// app.use(
//   cors({
//     credentials: true,
//     origin: true,
//     exposedHeaders: "*",
//   })
// );

// app.use(crossOrigin());
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
