exports.up = function (knex) {
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() => {
    return knex.schema.createTable("users", (usersTable) => {
      usersTable
        .uuid("user_id")
        .primary()
        .unique()
        .defaultsTo(knex.raw("uuid_generate_v4()"));
      usersTable.string("user_email").notNullable().unique();
      usersTable.string("user_firstName").notNullable();
      usersTable.string("user_lastName").notNullable();
      usersTable.string("user_password").notNullable();
      usersTable.integer("user_score").defaultsTo(0);
    });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
