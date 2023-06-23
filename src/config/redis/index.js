const { createClient } = require("redis");
const logger = require("../logger");
const { NODE_ENV } = require("../env");

const client = createClient();

client.on("error", err => logger.error(`Redis client error ---> ${err}`));

async function init() {
  try {
    await client.connect();
    logger.info("Redis connected");
  } catch (err) {
    logger.error("");
  }
}

if (NODE_ENV !== "test") init();

module.exports = client;
