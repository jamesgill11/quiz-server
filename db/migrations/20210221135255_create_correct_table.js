exports.up = function (knex) {
  return knex.schema.createTable("correct", (correctData) => {
    correctData.string("correctAnswer");
    correctData.integer("correct_question_id").references("questions.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("correct");
};
