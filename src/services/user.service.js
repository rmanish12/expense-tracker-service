const isEmpty = require("lodash.isempty");
const UserRepo = require("../repository/user.repo");
const logger = require("../config/logger");
const { NotFoundError, ForbiddenError, BadRequestError } = require("../errors");
const { hashPassword, comparePassword } = require("../helper/bcrypt");

const getUserDetailsResponse = user => {
  const userDetailsResponse = {
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender
  };

  return userDetailsResponse;
};

const getUserDetails = async ({ userId }) => {
  try {
    const userExist = await UserRepo.userExist(userId);

    if (isEmpty(userExist)) {
      throw new NotFoundError("User does not exist");
    }

    const user = await UserRepo.getUserDetailsById(userId);

    if (!user.isActive) {
      throw new ForbiddenError("Inactive user");
    }
    return getUserDetailsResponse(user);
  } catch (err) {
    logger.error(`Error while fetching user details ---> ${err}`);
    throw err;
  }
};

const updateUser = async userDetails => {
  try {
    const user = await UserRepo.getUserDetailsById(userDetails.id);

    if (!user.isActive) {
      throw new ForbiddenError("Inactive user");
    }

    const updatedUser = await UserRepo.updateUser(user, userDetails);
    return getUserDetailsResponse(updatedUser);
  } catch (err) {
    logger.error(`Error while updating user ---> ${err}`);
    throw err;
  }
};

const updateUserPassword = async ({ userId, oldPassword, newPassword }) => {
  try {
    const user = await UserRepo.getUserDetailsById(userId);

    if (!user.isActive) {
      throw new ForbiddenError("Inactive user");
    }

    const validOldPassword = await comparePassword(oldPassword, user.password);

    if (!validOldPassword) {
      throw new BadRequestError("Incorrect password");
    }

    const hashedNewPassword = await hashPassword(newPassword);
    await UserRepo.updateUserPassword(user, hashedNewPassword);
  } catch (err) {
    logger.error(`Error while updating user password ---> ${err}`);
    throw err;
  }
};

module.exports = { getUserDetails, updateUser, updateUserPassword };
