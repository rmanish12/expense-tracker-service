require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, APP_PORT } =
  process.env;

module.exports = { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, APP_PORT };