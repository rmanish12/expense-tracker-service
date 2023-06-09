const app = require("./app");
const logger = require("./config/logger");
const { APP_PORT } = require("./config/env");

app.listen(APP_PORT, () => logger.info(`Server started on PORT ${APP_PORT}`));
