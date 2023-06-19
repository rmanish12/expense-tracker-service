const registerUserRequestBodySchema = {
  type: "object",
  required: ["email", "password", "firstName"],
  additionalProperties: true,
  properties: {
    email: {
      type: "string",
      allOf: [
        {
          transform: ["trim"]
        },
        {
          minLength: 1
        }
      ]
    },
    password: {
      type: "string",
      allOf: [
        {
          transform: ["trim"]
        },
        {
          minLength: 6,
          maxLength: 20
        }
      ]
    },
    firstName: {
      type: "string",
      allOf: [
        {
          transform: ["trim"]
        },
        {
          minLength: 1
        }
      ]
    },
    lastName: { type: "string" },
    gender: {
      type: "string",
      enum: ["MALE", "FEMALE", "OTHERS"]
    }
  }
};

const loginUserRequestBodySchema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      allOf: [
        {
          transform: ["trim"]
        },
        {
          minLength: 1
        }
      ]
    },
    password: {
      type: "string",
      allOf: [
        {
          transform: ["trim"]
        },
        {
          minLength: 6,
          maxLength: 20
        }
      ]
    }
  }
};

module.exports = { registerUserRequestBodySchema, loginUserRequestBodySchema };
