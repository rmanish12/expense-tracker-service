const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class UnauthenticateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.code = ReasonPhrases.UNAUTHORIZED;
  }
}

module.exports = UnauthenticateError;
