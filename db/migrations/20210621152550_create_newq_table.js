exports.up = function (knex) {
  return knex.schema.createTable("newq", (quizTable) => {
    quizTable.string("q_prompt").notNullable();
    quizTable.string("a");
    quizTable.string("b");
    quizTable.string("c");
    quizTable.string("d");
    quizTable.string("q_correctAnswer");
    quizTable.integer("q_id").references("questions.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("newq");
};
