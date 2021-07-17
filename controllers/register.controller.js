const bcrypt = require("bcrypt");
const {
  fetchUsers,
  sendSingleUser,
  fetchSingleUser,
  removeUserByEmail,
  editUser,
} = require("../models/register.model");

exports.getAllUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendNewUser = async (req, res, next) => {
  const { user_email, user_firstName, user_lastName, user_password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
  sendSingleUser(user_email, user_firstName, user_lastName, hashedPassword)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSingleUser = (req, res, next) => {
  const { user_email } = req.params;

  fetchSingleUser(user_email)
    .then((singleUser) => {
      res.status(200).send({ singleUser });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeUser = (req, res, next) => {
  const { user_email } = req.params;

  removeUserByEmail(user_email)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.updatedUser = (req, res, next) => {
  const { user_email } = req.params;

  const { user_firstName } = req.body;

  editUser(user_email, user_firstName)
    .then((updatedUser) => {
      res.status(200).send({ updatedUser });
    })
    .catch((err) => {
      next(err);
    });
};
