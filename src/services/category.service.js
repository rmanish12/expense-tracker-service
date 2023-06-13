/* eslint-disable no-underscore-dangle */
const CategoryRepo = require("../repository/category.repo");
const logger = require("../config/logger");
const { ConflictError } = require("../errors");

const getCategoryResponseMapper = category => {
  if (Array.isArray(category)) {
    return category.map(c => ({
      id: c._id,
      name: c.name,
      budgetType: c.budgetType
    }));
  }
  return {
    id: category._id,
    name: category.name,
    budgetType: category.budgetType
  };
};

const createCategoryResponseMapper = category => ({
  id: category._id,
  name: category.name,
  budgetType: category.budgetType,
  createdAt: category.createdAt,
  updatedAt: category.updatedAt
});

const createCategory = async ({ name, budgetType }) => {
  try {
    const categoryExist = await CategoryRepo.categoryExist(name, budgetType);

    if (categoryExist) {
      throw new ConflictError("Categoy combination already exist");
    }
    const category = await CategoryRepo.createCategory(name, budgetType);
    return createCategoryResponseMapper(category);
  } catch (err) {
    logger.error(`Error while creating category - ${name} ---> ${err}`);
    throw err;
  }
};

const getCategoriesByType = async budgetType => {
  try {
    const categories = await CategoryRepo.getCategoriesByType(
      budgetType.toUpperCase()
    );
    return getCategoryResponseMapper(categories);
  } catch (err) {
    logger.error(
      `Error while getting categories for type ${budgetType} ---> ${err}`
    );
    throw err;
  }
};

const updateCategory = async ({ categoryId, newName }) => {
  try {
    const updatedCategory = await CategoryRepo.updateCategory(
      categoryId,
      newName
    );
    return createCategoryResponseMapper(updatedCategory);
  } catch (err) {
    logger.error(`Error while updating category ---> ${err}`);
    throw err;
  }
};

const deleteCategory = async categoryId => {
  try {
    await CategoryRepo.deleteCategory(categoryId);
  } catch (err) {
    logger.error(`Error while deleting category ${categoryId} ---> ${err}`);
    throw err;
  }
};

module.exports = {
  createCategory,
  getCategoriesByType,
  updateCategory,
  deleteCategory
};
