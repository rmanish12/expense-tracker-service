const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const generateToken = payload => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d"
  });

  return token;
};

const decodeToken = token => {
  const { id, email, role } = jwt.verify(token, JWT_SECRET);
  return { id, email, role };
};

module.exports = { generateToken, decodeToken };
