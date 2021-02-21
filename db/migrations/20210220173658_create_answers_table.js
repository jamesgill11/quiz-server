exports.up = function (knex) {
  console.log("creating answers table");
  return knex.schema.createTable("answers", (answersTable) => {
    answersTable.string("a");
    answersTable.string("b");
    answersTable.string("c");
    answersTable.string("d");
    answersTable.integer("question_id").references("questions.id");
  });
};

exports.down = function (knex) {
  console.log("removing answers table");
  return knex.schema.dropTable("answers");
};
