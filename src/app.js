const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const winston = require("./config/logger");

require("./config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("combined", { stream: winston.stream }));

module.exports = app;
