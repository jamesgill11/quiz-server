const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;
const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "quiz",
    },
  },
  test: {
    connection: {
      database: "quiz_test",
    },
  },
  production: {
    connection: {
      connectionString:
        "postgres://mjlsjmeybblkct:5daef197e49132f9a9e440af7dbadadc9324a10535f2fb7cc5fb43b8d7eee834@ec2-52-70-67-123.compute-1.amazonaws.com:5432/d3tgun6ovoc5dm",
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
const log = console.log;
console.log = (...args) => {
  if (!/FsMigrations/.test(args[0])) log(...args);
};
module.exports = { ...customConfig[ENV], ...baseConfig };
