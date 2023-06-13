const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const winston = require("./config/logger");
const AuthRoutes = require("./routes/auth/auth.routes");
const UserRoutes = require("./routes/user/user.routes");
const CategoryRoutes = require("./routes/category/category.routes");
const authenticate = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");

require("./config/db");
require("./config/redis");
const corsConfig = require("./config/cors");
const bodyParserConfig = require("./config/bodyParser");

const app = express();

app.use(cors(corsConfig));
app.use(bodyParser.json(bodyParserConfig));
app.use(cookieParser());
app.use(morgan("combined", { stream: winston.stream }));

app.use("/auth", AuthRoutes);
app.use("/user", authenticate, UserRoutes);
app.use("/category", authenticate, CategoryRoutes);
app.use(errorHandler);

module.exports = app;
