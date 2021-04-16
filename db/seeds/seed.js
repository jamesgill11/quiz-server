const {
  questionsData,
  answersData,
  correctData,
  userData,
} = require("../data/index");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const questionsInsertion = knex("questions").insert(questionsData);
      const answersInsertion = knex("answers").insert(answersData);
      const correctInsertion = knex("correct").insert(correctData);
      const userInsertion = knex("users").insert(userData);

      return Promise.all([
        questionsInsertion,
        answersInsertion,
        correctInsertion,
        userInsertion,
      ]);
    })
    .catch((err) => console.log(err));
};
