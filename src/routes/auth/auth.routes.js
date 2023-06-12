const router = require("express").Router();
const { validateSchema } = require("../../config/ajv");
const authenticateUser = require("../../middlewares/authentication");
const {
  registerUserRequestBodySchema,
  loginUserRequestBodySchema
} = require("./auth.schema");
const AuthController = require("../../controller/auth.controller");

router.post(
  "/register",
  validateSchema([{ data: "body", schema: registerUserRequestBodySchema }]),
  AuthController.registerUser
);

router.post(
  "/login",
  validateSchema([{ data: "body", schema: loginUserRequestBodySchema }]),
  AuthController.loginUser
);

router.get("/logout", authenticateUser, AuthController.logoutUser);

module.exports = router;
