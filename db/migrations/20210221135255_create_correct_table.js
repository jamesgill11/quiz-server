exports.up = function (knex) {
  console.log("creating create table");
  return knex.schema.createTable("correct", (correctData) => {
    correctData.string("correctAnswer");
    correctData.integer("correct_question_id").references("questions.id");
  });
};

exports.down = function (knex) {
  console.log("removing create table");
  return knex.schema.dropTable("correct");
};
