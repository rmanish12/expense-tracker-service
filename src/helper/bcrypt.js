const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS);

const comparePassword = (currentPassword, encryptedPassword) =>
  bcrypt.compare(currentPassword, encryptedPassword);

module.exports = { hashPassword, comparePassword };
