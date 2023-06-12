const { encryptPassword, decryptPassword } = require("./crypto");

const password = "password123";

const testEncryption = async () => {
  const encryptedPassword = await encryptPassword(password);
  console.log("encryptedPassword: ", encryptedPassword);
};

testEncryption();
