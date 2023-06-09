/* eslint-disable no-underscore-dangle */
const isEmpty = require("lodash.isempty");
const AuthRepo = require("../repository/auth.repo");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const {
  ConflictError,
  NotFoundError,
  ForbiddenError,
  BadRequestError
} = require("../errors");
const logger = require("../config/logger");
const redisClient = require("../config/redis");
const { generateToken } = require("../helper/jwt");
const { validateEmail } = require("../validations");

const createUser = async ({
  email,
  password,
  firstName,
  lastName,
  gender,
  isActive,
  role
}) => {
  try {
    if (!validateEmail(email)) {
      throw new BadRequestError("Invalid payload");
    }

    const user = await AuthRepo.findUserExistByEmail(email);

    if (!isEmpty(user)) {
      throw new ConflictError("User with the given email already exist");
    }

    const hashedPassword = await hashPassword(password);
    await AuthRepo.createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName: lastName || "",
      gender: gender || "MALE",
      isActive: isActive || true,
      role: role || "NORMAL_USER"
    });
  } catch (err) {
    logger.error(`Failed to create user - ${email}`);
    throw err;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    if (!validateEmail(email)) {
      throw new BadRequestError("Invalid payload");
    }
    const user = await AuthRepo.findUserByEmail(email);

    if (isEmpty(user)) {
      throw new NotFoundError(`User with email does not exist`);
    }

    if (!user.isActive) {
      throw new ForbiddenError("User is not active");
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenError("Password does not match");
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    await redisClient.set(token, "");
    return { token };
  } catch (err) {
    logger.error(`Error while logging in user ${email} --- ${err}`);
    throw err;
  }
};

const logoutUser = async ({ token }) => {
  try {
    await redisClient.del(token);
  } catch (err) {
    logger.error(`Error while logging out user --- ${err}`);
    throw err;
  }
};

module.exports = { createUser, loginUser, logoutUser };
