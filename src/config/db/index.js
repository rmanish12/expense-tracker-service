const mongoose = require("mongoose");
const logger = require("../logger");

const { DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } = require("../env");

const DB_URL_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
async function connect() {
  await mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
  );
}

connect()
  .then(() => logger.info("DB CONNECTED"))
  .catch(err => logger.error(`Error while connecting to DB ${err}`));
