const { ALLOWED_ORIGIN } = require("../env");

module.exports = {
  origin: ALLOWED_ORIGIN, // Access-Control-Allow-Origin CORS header
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Access-Control-Allow-Methods CORS header
  allowedHeaders: ["Content-Type", "Authorization"], // Access-Control-Allow-Headers CORS header
  credentilas: true // Access-Control-Allow-Credentials CORS header
};
