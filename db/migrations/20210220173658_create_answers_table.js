exports.up = function (knex) {
  return knex.schema.createTable("answers", (answersTable) => {
    answersTable.string("a");
    answersTable.string("b");
    answersTable.string("c");
    answersTable.string("d");
    answersTable.integer("id").references("questions.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("answers");
};
