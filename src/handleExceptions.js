const mongoose = require("./config/db");
const redisClient = require("./config/redis");
const logger = require("./config/logger");

process.on("uncaughtException", async () => {
  await mongoose.connection.close();
  logger.info("DB DISCONNECTED");
  await redisClient.quit();
  logger.info("Redis disconnected");
});

process.on("unhandledRejection", async () => {
  await mongoose.connection.close();
  logger.info("DB DISCONNECTED");
  await redisClient.quit();
  logger.info("Redis disconnected");
});

process.on("SIGINT", async signal => {
  await mongoose.connection.close();
  logger.info("DB DISCONNECTED");
  await redisClient.quit();
  logger.info("Redis disconnected");
});

module.exports = process;
