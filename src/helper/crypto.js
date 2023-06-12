const fs = require("fs");
const crypto = require("crypto");

const encryptPassword = password => {
  const publicKey = fs.readFileSync("public_key.pem", "utf8");

  const encryptedPassword = crypto.publicEncrypt(
    {
      key: publicKey.split(String.raw`\n`).join("\n"),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256"
    },
    Buffer.from(password)
  );
  return encryptedPassword.toString("base64");
};

const decryptPassword = text => {
  const encryptedBuffer = Buffer.from(text, "base64");
  return () => {
    const decryptedText = crypto.privateDecrypt(
      {
        key: fs.readFileSync("private_key.pem", "utf8"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
      },
      encryptedBuffer
    );
    return decryptedText.toString();
  };
};

module.exports = { encryptPassword, decryptPassword };
