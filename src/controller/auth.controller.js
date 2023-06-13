const { StatusCodes } = require("http-status-codes");
const AuthService = require("../services/auth.service");
const logger = require("../config/logger");

const registerUser = async (req, res, next) => {
  logger.info(`Invoking request for creating user - ${req.body.email}`);
  try {
    await AuthService.createUser(req.body);
    return res
      .status(StatusCodes.CREATED)
      .send({ message: "User created successfully" });
  } catch (err) {
    logger.error(`Error while creating user ${req.body.email} ----> ${err}`);
    return next(err);
  }
};

const loginUser = async (req, res, next) => {
  logger.info(`Invoking request for logging in user - ${req.body.email}`);
  try {
    const { email, password } = req.body;
    const tokenDetails = await AuthService.loginUser({ email, password });
    return res.status(StatusCodes.OK).send(tokenDetails);
  } catch (err) {
    logger.error(`Error while logging in user ${req.body.email} ---> ${err}`);
    return next(err);
  }
};

const logoutUser = async (req, res, next) => {
  logger.info(`Invoking request for logging out user - ${req.user.email}`);
  try {
    await AuthService.logoutUser({ token: req.user.token });
    return res.status(StatusCodes.OK).send({});
  } catch (err) {
    logger.error(`Error while logging out user ----> ${err}`);
    return next(err);
  }
};

module.exports = { registerUser, loginUser, logoutUser };
