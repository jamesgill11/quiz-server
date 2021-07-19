const loginRouter = require("express").Router();
const rfTokenRouter = require("express").Router();
const {
  authUser,
  refToken,
  delRfToken,
} = require("../controllers/login.controller");

loginRouter.route("/").post(authUser);
rfTokenRouter.route("/").get(refToken).delete(delRfToken);

module.exports = { loginRouter, rfTokenRouter, delRfToken };
