const ENV = process.env.NODE_ENV || "production";
const knex = require("knex");

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");
console.log(process.env.DATABASE_URL);
module.exports = knex(dbConfig);
