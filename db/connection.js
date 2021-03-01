const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");

const dbConfig =
  ENV === "production"
    ? {
        client: "pg",
        connection: process.env.DATABASE_URL,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : require("../knexfile");

module.exports = knex(dbConfig);
