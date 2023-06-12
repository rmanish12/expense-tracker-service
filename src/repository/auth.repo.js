const User = require("../models/user.model");
const logger = require("../config/logger");

const createUser = async ({
  email,
  password,
  firstName,
  lastName,
  gender,
  isActive,
  role
}) => {
  const newUser = new User({
    email,
    password,
    firstName,
    lastName,
    gender,
    isActive,
    role
  });

  try {
    await newUser.save();
    logger.info(`User ${email} sucessfully created`);
  } catch (err) {
    logger.error(`Error while creating user ${email} ---> ${err}`);
  }
};

const findUserExistByEmail = async email => {
  const user = await User.exists({ email }).exec();
  return user;
};

const findUserByEmail = async email => {
  const user = await User.findOne({ email }).exec();
  return user;
};

module.exports = { createUser, findUserExistByEmail, findUserByEmail };
