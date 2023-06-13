const { StatusCodes } = require("http-status-codes");
const CategoryService = require("../services/category.service");
const logger = require("../config/logger");

const createCategory = async (req, res, next) => {
  logger.info(`Invoking request for creating category`);
  try {
    const { name, budgetType } = req.body;
    const category = await CategoryService.createCategory({ name, budgetType });
    return res.status(StatusCodes.OK).send({ data: category });
  } catch (err) {
    logger.error(`Error while creating category ---> ${err}`);
    return next(err);
  }
};

const getCategoriesByType = async (req, res, next) => {
  logger.info(`Invoking request for getting categories`);
  try {
    const { budgetType } = req.params;
    const categories = await CategoryService.getCategoriesByType(budgetType);
    return res.status(StatusCodes.OK).send({ data: categories });
  } catch (err) {
    logger.error(`Error while getting categories ---> ${err}`);
    return next(err);
  }
};

const updateCategory = async (req, res, next) => {
  logger.info(`Invoking request for updating categories`);
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const updatedCategory = await CategoryService.updateCategory({
      categoryId,
      newName: name
    });
    return res.status(StatusCodes.OK).send({ data: updatedCategory });
  } catch (err) {
    logger.error(`Error while updating category ---> ${err}`);
    return next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  logger.info(`Invoking request for deleting categories`);
  try {
    const { categoryId } = req.params;
    await CategoryService.deleteCategory(categoryId);
    return res.status(StatusCodes.OK).send({ message: "OK" });
  } catch (err) {
    logger.error(`Error while deleting category ---> ${err}`);
    return next(err);
  }
};

module.exports = {
  createCategory,
  getCategoriesByType,
  updateCategory,
  deleteCategory
};
