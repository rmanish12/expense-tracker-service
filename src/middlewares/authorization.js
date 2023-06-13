const { ForbiddenError } = require("../errors");

const authorization = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "ADMIN_USER" && role !== "SUPER_USER") {
      throw new ForbiddenError("Insufficient priviledge");
    }
    return next();
  } catch (err) {
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      errorCode: err.code,
      errors: [
        {
          message: err.message
        }
      ]
    });
  }
};

module.exports = authorization;
