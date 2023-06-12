const router = require("express").Router();
const UserController = require("../../controller/user.controller");
const {
  updateUserReqBody,
  updateUserPasswordReqBody
} = require("./user.schema");
const { validateSchema } = require("../../config/ajv");

router.get("/profile", UserController.getUserDetails);

router.put(
  "/",
  validateSchema([{ data: "body", schema: updateUserReqBody }]),
  UserController.updateUser
);

router.patch(
  "/changePassword",
  validateSchema([{ data: "body", schema: updateUserPasswordReqBody }]),
  UserController.updateUserPassword
);

module.exports = router;
