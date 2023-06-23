const UserService = require("../user.service");
const UserRepo = require("../../repository/user.repo");
const { hashPassword, comparePassword } = require("../../helper/bcrypt");

jest.mock("../../repository/user.repo");
jest.mock("../../helper/bcrypt");

const mocks = {
  userDetails: {
    email: "abc@gmail.com",
    firstName: "Test",
    lastName: "User",
    gender: "MALE"
  },
  updatedUserDetails: {
    email: "updated@gmail.com",
    firstName: "Updated",
    lastName: "User",
    gender: "FEMALE"
  }
};

describe("User Service Test", () => {
  afterEach(() => jest.clearAllMocks());

  describe("Get user details", () => {
    it("should throw error if user does not exist", async () => {
      UserRepo.userExist.mockReturnValue(null);
      try {
        await UserService.getUserDetails({ userId: "123" });
      } catch (err) {
        expect(err.statusCode).toEqual(404);
        expect(err.code).toEqual("Not Found");
        expect(err.message).toEqual("User does not exist");
      }
    });

    it("should throw error if user is not active", async () => {
      UserRepo.userExist.mockImplementation(() => ({ _id: "123" }));
      UserRepo.getUserDetailsById.mockImplementation(() => ({
        ...mocks.userDetails,
        isActive: false
      }));
      try {
        await UserService.getUserDetails({ userId: "123" });
      } catch (err) {
        expect(err.statusCode).toEqual(403);
        expect(err.code).toEqual("Forbidden");
        expect(err.message).toEqual("Inactive user");
      }
    });

    it("should return user details", async () => {
      UserRepo.userExist.mockImplementation(() => ({ _id: "123" }));
      UserRepo.getUserDetailsById.mockImplementation(() => ({
        ...mocks.userDetails,
        isActive: true,
        _id: "123"
      }));

      const userDetails = await UserService.getUserDetails({ userId: "123" });
      expect(userDetails).toEqual({ ...mocks.userDetails, id: "123" });
    });
  });

  describe("Update user", () => {
    it("should throw error if user is inactive", async () => {
      UserRepo.getUserDetailsById.mockImplementation(() => ({
        ...mocks.userDetails,
        isActive: false
      }));
      try {
        await UserService.updateUser({ ...mocks.userDetails, id: "123" });
      } catch (err) {
        expect(err.statusCode).toEqual(403);
        expect(err.code).toEqual("Forbidden");
        expect(err.message).toEqual("Inactive user");
      }
    });

    it("should update the user", async () => {
      UserRepo.getUserDetailsById.mockImplementation(() => ({
        ...mocks.userDetails,
        isActive: true
      }));
      UserRepo.updateUser.mockImplementation(() => ({
        ...mocks.updatedUserDetails,
        _id: "123"
      }));
      const updatedUserDetails = await UserService.updateUser({
        ...mocks.updatedUserDetails,
        id: "123"
      });
      expect(updatedUserDetails).toEqual({
        ...mocks.updatedUserDetails,
        id: "123"
      });
    });
  });

  describe("Update user password", () => {
    it("should throw error if user is inactive", async () => {
      UserRepo.getUserDetailsById.mockImplementation(() => ({
        ...mocks.getUserDetails,
        isActive: false
      }));
      try {
        await UserService.updateUserPassword({
          userId: "123",
          oldPassword: "old",
          newPassword: "new"
        });
      } catch (err) {
        expect(err.statusCode).toEqual(403);
        expect(err.code).toEqual("Forbidden");
        expect(err.message).toEqual("Inactive user");
      }
    });

    it("should throw error if password does not match", async () => {
      UserRepo.getUserDetailsById.mockImplementation(() => ({
        ...mocks.getUserDetails,
        isActive: true
      }));
      comparePassword.mockReturnValue(false);
      try {
        await UserService.updateUserPassword({
          userId: "123",
          oldPassword: "old",
          newPassword: "new"
        });
      } catch (err) {
        expect(err.statusCode).toEqual(400);
        expect(err.code).toEqual("Bad Request");
        expect(err.message).toEqual("Incorrect password");
      }
    });

    it("should update the password", async () => {
      const user = {
        ...mocks.getUserDetails,
        isActive: true
      };
      UserRepo.getUserDetailsById.mockReturnValue(user);
      comparePassword.mockReturnValue(true);
      hashPassword.mockReturnValue("hashedPassword");
      await UserService.updateUserPassword({
        userId: "123",
        oldPassword: "old",
        newPassword: "new"
      });
      expect(UserRepo.updateUserPassword).toHaveBeenCalledWith(
        user,
        "hashedPassword"
      );
    });
  });
});
