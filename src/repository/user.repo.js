const User = require("../models/user.model");

const userExist = async userId => {
  const user = await User.exists({ _id: userId }).exec();
  return user;
};

const getUserDetailsById = async userId => {
  const user = await User.findById(userId).exec();
  return user;
};

const updateUser = async (oldUserDetail, newUserDetail) => {
  const { firstName, lastName, gender } = newUserDetail;

  oldUserDetail.firstName = firstName;
  oldUserDetail.lastName = lastName;
  oldUserDetail.gender = gender;

  await oldUserDetail.save();
  return oldUserDetail;
};

const updateUserPassword = async (user, newPassword) => {
  user.password = newPassword;

  await user.save();
};

module.exports = {
  getUserDetailsById,
  updateUser,
  updateUserPassword,
  userExist
};
