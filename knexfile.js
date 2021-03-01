const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;
console.log(DB_URL);
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
      connectionString: DB_URL,
      ssl: {
        require: true,
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
