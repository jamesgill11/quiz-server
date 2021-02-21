const { questionsData, answersData, correctData } = require("../data/index");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const questionsInsertion = knex("questions").insert(questionsData);
      const answersInsertion = knex("answers").insert(answersData);
      const correctInsertion = knex("correct").insert(correctData);

      return Promise.all([
        questionsInsertion,
        answersInsertion,
        correctInsertion,
      ]);
    })
    .catch((err) => console.log(err));
};
