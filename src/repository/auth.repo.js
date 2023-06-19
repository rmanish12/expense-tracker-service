const { v4: uuidv4 } = require("uuid");
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
    _id: uuidv4(),
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
  const user = await User.exists({ email }).lean();
  return user;
};

const findUserByEmail = async email => {
  const user = await User.findOne({ email })
    .select({ _id: 1, email: 1, role: 1 })
    .lean();
  return user;
};

module.exports = { createUser, findUserExistByEmail, findUserByEmail };
