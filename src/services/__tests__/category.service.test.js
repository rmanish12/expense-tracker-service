/* eslint-disable no-undef */
const CategoryService = require("../category.service");
const CategoryRepo = require("../../repository/category.repo");

jest.mock("../../repository/category.repo");

const mocks = {
  createCategoryPayload: {
    name: "Salary",
    budgetType: "INCOME"
  },
  createCategoryRes: {
    name: "Salary",
    budgetType: "INCOME",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z"
  },
  getCategoriesRepoMock: [
    {
      _id: 1,
      name: "Salary",
      budgetType: "INCOME"
    },
    {
      _id: 2,
      name: "Bonus",
      budgetType: "INCOME"
    }
  ],
  getCategoriesRes: [
    {
      id: 1,
      name: "Salary",
      budgetType: "INCOME"
    },
    {
      id: 2,
      name: "Bonus",
      budgetType: "INCOME"
    }
  ]
};

describe("Category Service", () => {
  afterEach(() => jest.clearAllMocks());

  describe("Create Category", () => {
    it("should throw error if category combination exists", async () => {
      CategoryRepo.categoryExist.mockImplementation(() => ({ _id: 1 }));
      try {
        await CategoryService.createCategory(mocks.createCategoryPayload);
      } catch (err) {
        expect(err.statusCode).toEqual(409);
        expect(err.code).toEqual("Conflict");
        expect(err.message).toEqual("Categoy combination already exist");
      }
    });

    it("should create the category", async () => {
      CategoryRepo.categoryExist.mockReturnValue(null);
      CategoryRepo.createCategory.mockImplementation(() => ({
        ...mocks.createCategoryRes,
        _id: 1
      }));
      const category = await CategoryService.createCategory(
        mocks.createCategoryPayload
      );
      expect(category).toEqual({ ...mocks.createCategoryRes, id: 1 });
    });
  });

  describe("Get Categories by type", () => {
    it("should return categories", async () => {
      CategoryRepo.getCategoriesByType.mockImplementation(
        () => mocks.getCategoriesRepoMock
      );
      const categories = await CategoryService.getCategoriesByType("income");
      expect(CategoryRepo.getCategoriesByType).toHaveBeenCalledWith("INCOME");
      expect(categories).toEqual(mocks.getCategoriesRes);
    });

    it("should catch err", async () => {
      CategoryRepo.getCategoriesByType.mockImplementation(() => {
        throw new Error("Error test");
      });
      try {
        await CategoryService.getCategoriesByType("income");
      } catch (err) {
        expect(err.message).toEqual("Error test");
      }
    });
  });

  describe("Update category", () => {
    it("should throw error if category does not exist", async () => {
      CategoryRepo.getCategoryById.mockReturnValue(null);
      try {
        await CategoryService.updateCategory({
          categoryId: "123",
          name: "Salary"
        });
      } catch (err) {
        expect(err.statusCode).toEqual(404);
        expect(err.code).toEqual("Not Found");
        expect(err.message).toEqual("Category does not exist");
      }
    });

    it("should update the category", async () => {
      CategoryRepo.getCategoryById.mockImplementation(() => ({ _id: "123" }));
      CategoryRepo.updateCategory.mockImplementation(() => ({
        ...mocks.createCategoryRes,
        _id: "123"
      }));
      const updatedCategory = await CategoryService.updateCategory({
        categoryId: "123",
        name: "Salary"
      });
      expect(updatedCategory).toEqual({
        ...mocks.createCategoryRes,
        id: "123"
      });
    });
  });

  describe("Delete category", () => {
    it("should throw error if category does not exist", async () => {
      CategoryRepo.getCategoryById.mockReturnValue(null);
      try {
        await CategoryService.deleteCategory("123");
      } catch (err) {
        expect(err.statusCode).toEqual(404);
        expect(err.code).toEqual("Not Found");
        expect(err.message).toEqual("Category does not exist");
      }
    });

    it("should delete the category", async () => {
      CategoryRepo.getCategoryById.mockImplementation(() => ({ _id: "123" }));
      CategoryRepo.deleteCategory.mockImplementation(() => ({}));
      await CategoryService.deleteCategory("123");
      expect(CategoryRepo.deleteCategory).toHaveBeenCalledTimes(1);
      expect(CategoryRepo.deleteCategory).toHaveBeenCalledWith("123");
    });
  });
});
