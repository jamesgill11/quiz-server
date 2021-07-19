const loginRouter = require("express").Router();
const rfTokenRouter = require("express").Router();
const {
  authUser,
  refToken,
  delRfToken,
} = require("../controllers/login.controller");
loginRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  next();
});
rfTokenRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  next();
});
loginRouter.route("/").post(authUser);
rfTokenRouter.route("/").get(refToken).delete(delRfToken);

module.exports = { loginRouter, rfTokenRouter, delRfToken };
