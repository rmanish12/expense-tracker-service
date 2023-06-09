const { createLogger, format, transports } = require("winston");
const { NODE_ENV } = require("../env");

const { combine, timestamp, printf } = format;

const options = {
  console: {
    handleExceptions: true,
    json: true,
    colorize: true
  }
};

const getLogLevel = () => {
  const env = NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "info";
};

const myFormat = printf(
  ({ level, message, timestamp: msgTimestamp }) =>
    `[${msgTimestamp}] | [${level}] | ${message}`
);

const logger = createLogger({
  level: getLogLevel(),
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console(options.console)],
  exitOnError: false,
  silent: NODE_ENV === "test"
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
