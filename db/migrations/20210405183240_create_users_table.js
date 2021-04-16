exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("user_email").primary().notNullable().unique();
    usersTable.string("user_firstName").notNullable();
    usersTable.string("user_lastName").notNullable();
    usersTable.string("user_password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
