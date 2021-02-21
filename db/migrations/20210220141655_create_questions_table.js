exports.up = function (knex) {
  console.log("created questions table");
  return knex.schema.createTable("questions", (questionsTable) => {
    questionsTable.increments("id").primary();
    questionsTable.string("question").notNullable();
  });
};

exports.down = function (knex) {
  console.log("removing questions table");
  return knex.schema.dropTable("questions");
};
