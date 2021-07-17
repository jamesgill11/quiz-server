const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.select("*").from("users");
};

exports.sendSingleUser = (
  user_email,
  user_firstName,
  user_lastName,
  user_password
) => {
  return db
    .insert({ user_email, user_firstName, user_lastName, user_password })
    .into("users")
    .returning("*")
    .then((res) => {
      const [postedUser] = res;
      return postedUser;
    });
};

exports.fetchSingleUser = (user_email) => {
  return db
    .select("*")
    .from("users")
    .where("user_email", user_email)
    .returning("*")
    .then((res) => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "404 Error: Not Found" });
      } else {
        const [singleUser] = res;
        return singleUser;
      }
    });
};

exports.removeUserByEmail = (user_email) => {
  return db("users")
    .where("user_email", user_email)
    .del()
    .then((res) => {
      if (res === 0) {
        return Promise.reject({ status: 404, msg: "404 Error: Not Found" });
      } else {
        return res;
      }
    });
};

exports.editUser = (user_email, user_firstName) => {
  return db("users")
    .where("user_email", user_email)
    .update("user_firstName", user_firstName)
    .returning("*")
    .then((res) => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "404 Error: Not Found" });
      }
      const [updatedUser] = res;
      return updatedUser;
    });
};
