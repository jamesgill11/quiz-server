const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const apiRouter = require("./routes/api.router");
const {
  customErrorHandler,
  handlePSQLErrors,
  handle405Errors,
  handleServerErrors,
} = require("./error_handlers/index");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.use("/", (req, res, next) => {
  res.send({ status: 200, msg: "Welcome to my Quiz" });
});

app.use("*", (req, res, next) => {
  // res.status(404).send({ msg: "404 Error: Path Not found" });
  next({ status: 404, msg: "Route not found" });
});

app.all("*", function (req, res, next) {
  /**
   * Response settings
   * @type {Object}
   */
  var responseSettings = {
    AccessControlAllowOrigin: req.headers.origin,
    AccessControlAllowHeaders:
      "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
    AccessControlAllowMethods: "POST, GET, PUT, DELETE, OPTIONS",
    AccessControlAllowCredentials: true,
  };

  /**
   * Headers
   */
  res.header(
    "Access-Control-Allow-Credentials",
    responseSettings.AccessControlAllowCredentials
  );
  res.header(
    "Access-Control-Allow-Origin",
    responseSettings.AccessControlAllowOrigin
  );
  res.header(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"]
      ? req.headers["access-control-request-headers"]
      : "x-requested-with"
  );
  res.header(
    "Access-Control-Allow-Methods",
    req.headers["access-control-request-method"]
      ? req.headers["access-control-request-method"]
      : responseSettings.AccessControlAllowMethods
  );

  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(customErrorHandler);
app.use(handlePSQLErrors);
app.use(handle405Errors);
app.use(handleServerErrors);

module.exports = app;
