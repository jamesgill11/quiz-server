const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api.router");
const {
  customErrorHandler,
  PSQLErrorHandler,
  handle405Errors,
  handleServerErrors,
} = require("./error_handlers/index");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use("/favicon.ico", (req, res, next) => {
  next({ status: 404, msg: "Favicon not found" });
});
app.all("/*", (req, res, next) => {
  // res.status(404).send({ msg: "404 Error: Path Not found" });
  next({ status: 404, msg: "Route not found" });
});

app.use(customErrorHandler);
app.use(PSQLErrorHandler);
app.use(handle405Errors);
app.use(handleServerErrors);

module.exports = app;
