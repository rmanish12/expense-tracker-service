const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.code = ReasonPhrases.NOT_FOUND;
  }
}

module.exports = NotFoundError;
