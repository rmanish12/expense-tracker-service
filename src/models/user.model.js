const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    default: uuidv4()
  },
  email: {
    type: String,
    required: [true, "Email of the user is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
    default: "MALE"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ["NORMAL_USER", "ADMIN_USER", "SUPER_USER"],
    default: "NORMAL_USER"
  }
});

UserSchema.set("timestamps", true);

const User = mongoose.model("User", UserSchema);

module.exports = User;
