const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.code = ReasonPhrases.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
