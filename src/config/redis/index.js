const { createClient } = require("redis");
const logger = require("../logger");

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

init();

module.exports = client;
