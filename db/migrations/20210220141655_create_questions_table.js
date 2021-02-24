exports.up = function (knex) {
  return knex.schema.createTable("questions", (questionsTable) => {
    questionsTable.increments("id").primary();
    questionsTable.string("question").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("questions");
};
