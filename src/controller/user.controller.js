const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user.service");
const logger = require("../config/logger");

const getUserDetails = async (req, res, next) => {
  logger.info("Invoking request for getting user details");
  try {
    const userDetails = await UserService.getUserDetails({
      userId: req.user.id
    });
    return res.status(StatusCodes.OK).send({ data: userDetails });
  } catch (err) {
    logger.error("Error while getting user details");
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  logger.info("Invoking request for updating user");
  try {
    const userDetail = {
      ...req.body,
      id: req.user.id
    };
    const updatedUserDetails = await UserService.updateUser(userDetail);
    return res.status(StatusCodes.OK).send({ data: updatedUserDetails });
  } catch (err) {
    logger.error("Error while updating user");
    return next(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  logger.info("Invoking request for updating user password");
  try {
    await UserService.updateUserPassword({
      userId: req.user.id,
      ...req.body
    });
    return res.status(StatusCodes.OK).send({ message: "OK" });
  } catch (err) {
    logger.error("Error while updating user password");
    return next(err);
  }
};

module.exports = { getUserDetails, updateUser, updateUserPassword };
