const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { decodeToken } = require("../helper/jwt");
const redisClient = require("../config/redis");
const UnautheticateError = require("../errors");

const authenticateUser = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  try {
    if (!bearerToken) throw new UnautheticateError("Unautheticated");
    const authToken = bearerToken.substring(7);
    const redisValue = await redisClient.get(authToken);
    if (redisValue === null) {
      throw new UnautheticateError("Unautheticated");
    }
    const payload = decodeToken(authToken);
    req.user = {
      id: payload.id,
      role: payload.role,
      email: payload.email,
      token: authToken
    };
    return next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      statusCode: StatusCodes.UNAUTHORIZED,
      errorCode: ReasonPhrases.UNAUTHORIZED,
      errors: [
        {
          message: "Unauthorized User"
        }
      ]
    });
  }
};

module.exports = authenticateUser;
