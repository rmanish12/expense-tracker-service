const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
    this.code = ReasonPhrases.CONFLICT;
  }
}

module.exports = ConflictError;
