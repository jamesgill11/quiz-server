const ENV = process.env.NODE_ENV || "production";
const knex = require("knex");

process.env.DATABASE_URL =
  "postgres://mjlsjmeybblkct:5daef197e49132f9a9e440af7dbadadc9324a10535f2fb7cc5fb43b8d7eee834@ec2-52-70-67-123.compute-1.amazonaws.com:5432/d3tgun6ovoc5dm";

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");
console.log(process.env.DATABASE_URL);
module.exports = knex(dbConfig);
