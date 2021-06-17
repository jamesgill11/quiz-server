const correctRouter = require("express").Router();
const { handle405Errors } = require("../error_handlers/index");
const { getAllCorrectAnswers } = require("../controllers/correct.controller");

correctRouter.route("/").get(getAllCorrectAnswers).all(handle405Errors);

module.exports = correctRouter;
