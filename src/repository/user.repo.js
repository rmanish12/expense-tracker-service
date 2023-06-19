const User = require("../models/user.model");

const userExist = async userId => {
  const user = await User.exists({ _id: userId }).lean();
  return user;
};

const getUserDetailsById = async userId => {
  const user = await User.findById(userId)
    .select({
      _id: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
      gender: 1,
      role: 1,
      isActive: 1
    })
    .lean();
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
