const AuthService = require("../auth.service");
const AuthRepo = require("../../repository/auth.repo");
const { validateEmail } = require("../../validations");
const { hashPassword, comparePassword } = require("../../helper/bcrypt");
const { generateToken } = require("../../helper/jwt");
const redisClient = require("../../config/redis");

jest.mock("../../repository/auth.repo");
jest.mock("../../validations");
jest.mock("../../helper/bcrypt");
jest.mock("../../helper/jwt");
jest.mock("../../config/redis");

const mocks = {
  createUserPayload: {
    email: "abc@gmail.com",
    password: "password123",
    firstName: "Test",
    lastName: "User",
    gender: "FEMALE"
  },
  createUserRepoArg: {
    email: "abc@gmail.com",
    password: "gibberish",
    firstName: "Test",
    lastName: "User",
    gender: "FEMALE",
    isActive: true,
    role: "NORMAL_USER"
  },
  loginUserPayload: {
    email: "abc@gmail.com",
    password: "password123"
  }
};

describe("Auth Service Test", () => {
  afterEach(() => jest.clearAllMocks());

  describe("Create User", () => {
    it("should validate email", async () => {
      validateEmail.mockReturnValue(false);
      try {
        await AuthService.createUser(mocks.createUserPayload);
      } catch (err) {
        expect(err.message).toEqual("Invalid payload");
        expect(err.statusCode).toEqual(400);
        expect(err.code).toEqual("Bad Request");
      }
    });

    it("should check for user existense", async () => {
      validateEmail.mockReturnValue(true);
      AuthRepo.findUserExistByEmail.mockImplementation(() => ({
        _id: 1
      }));
      try {
        await AuthService.createUser(mocks.createUserPayload);
      } catch (err) {
        expect(err.message).toEqual("User with the given email already exist");
        expect(err.statusCode).toEqual(409);
        expect(err.code).toEqual("Conflict");
      }
    });

    it("should create user", async () => {
      validateEmail.mockReturnValue(true);
      AuthRepo.findUserExistByEmail.mockReturnValue(null);
      hashPassword.mockReturnValue("gibberish");
      await AuthService.createUser(mocks.createUserPayload);
      expect(AuthRepo.createUser).toHaveBeenCalledTimes(1);
      expect(AuthRepo.createUser).toHaveBeenCalledWith(mocks.createUserRepoArg);
    });
  });

  describe("Login User", () => {
    it("should throw error if email is invalid", async () => {
      validateEmail.mockReturnValue(false);
      try {
        await AuthService.loginUser(mocks.loginUserPayload);
      } catch (err) {
        expect(err.message).toEqual("Invalid payload");
        expect(err.statusCode).toEqual(400);
        expect(err.code).toEqual("Bad Request");
      }
    });

    it("should throw error if user does not exist", async () => {
      validateEmail.mockReturnValue(true);
      AuthRepo.findUserByEmail.mockReturnValue(null);
      try {
        await AuthService.loginUser(mocks.loginUserPayload);
      } catch (err) {
        expect(err.message).toEqual("User with email does not exist");
        expect(err.statusCode).toEqual(404);
        expect(err.code).toEqual("Not Found");
      }
    });

    it("should throw error if user is inactive", async () => {
      validateEmail.mockReturnValue(true);
      AuthRepo.findUserByEmail.mockImplementation(() => ({
        _id: 1,
        isActive: false
      }));
      try {
        await AuthService.loginUser(mocks.loginUserPayload);
      } catch (err) {
        expect(err.message).toEqual("User is not active");
        expect(err.statusCode).toEqual(403);
        expect(err.code).toEqual("Forbidden");
      }
    });

    it("should throw error if password does not match", async () => {
      validateEmail.mockReturnValue(true);
      AuthRepo.findUserByEmail.mockImplementation(() => ({
        _id: 1,
        isActive: true
      }));
      comparePassword.mockReturnValue(false);
      try {
        await AuthService.loginUser(mocks.loginUserPayload);
      } catch (err) {
        expect(err.message).toEqual("Password does not match");
        expect(err.statusCode).toEqual(403);
        expect(err.code).toEqual("Forbidden");
      }
    });

    it("should login user", async () => {
      validateEmail.mockReturnValue(true);
      AuthRepo.findUserByEmail.mockImplementation(() => ({
        _id: 1,
        isActive: true
      }));
      comparePassword.mockReturnValue(true);
      generateToken.mockReturnValue("mockgeneratedtoken");
      redisClient.set.mockImplementation(() => {});
      const { token } = await AuthService.loginUser(mocks.loginUserPayload);
      expect(token).toEqual("mockgeneratedtoken");
    });
  });

  describe("Logout User", () => {
    it("should logout user", async () => {
      redisClient.del.mockImplementation(() => {});
      await AuthService.logoutUser({ token: "abc" });
      expect(redisClient.del).toHaveBeenCalledTimes(1);
      expect(redisClient.del).toHaveBeenCalledWith("abc");
    });

    it("should catch redis error", async () => {
      redisClient.del.mockImplementation(() => {
        throw new Error("mock redis error");
      });
      try {
        await AuthService.logoutUser({ token: "abc" });
      } catch (err) {
        expect(err.message).toEqual("mock redis error");
      }
    });
  });
});
