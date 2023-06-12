const updateUserReqBody = {
  type: "object",
  required: ["id", "email", "firstName", "lastName", "gender"],
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    email: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    gender: { type: "string" }
  }
};

const updateUserPasswordReqBody = {
  type: "object",
  required: ["oldPassword", "newPassword"],
  additionalProperties: false,
  properties: {
    oldPassword: { type: "string" },
    newPassword: { type: "string" }
  }
};

module.exports = {
  updateUserReqBody,
  updateUserPasswordReqBody
};
