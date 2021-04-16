const registerRouter = require("express").Router();
const {
  getAllUsers,
  sendNewUser,
  getSingleUser,
  removeUser,
  updatedUser,
} = require("../controllers/register.controller");
const { handle405Errors } = require("../error_handlers/index");

registerRouter
  .route("/")
  .get(getAllUsers)
  .post(sendNewUser)
  .all(handle405Errors);

registerRouter
  .route("/:user_email")
  .get(getSingleUser)
  .patch(updatedUser)
  .delete(removeUser)
  .all(handle405Errors);

module.exports = registerRouter;
