const { v4: uuidv4 } = require("uuid");
const Category = require("../models/category.model");

const categoryExist = async (name, budgetType) => {
  const categoryPresent = await Category.exists()
    .where("name", name)
    .where("budgetType", budgetType)
    .exec();
  return categoryPresent;
};

const createCategory = async (name, budgetType) => {
  const category = new Category({
    _id: uuidv4(),
    name,
    budgetType
  });

  return category.save();
};

const getCategoriesByType = async budgetType => {
  const categories = await Category.find({ budgetType })
    .select({ _id: 1, name: 1, budgetType: 1 })
    .exec();
  return categories;
};

const updateCategory = async (categoryId, newName) => {
  const category = await Category.findById(categoryId);
  category.name = newName;
  return category.save();
};

const deleteCategory = async categoryId => {
  const category = await Category.findById(categoryId);
  return category.deleteOne();
};

const getCategoryById = async categoryId => {
  const category = await Category.findById(categoryId)
    .select({ name: 1, budgetType: 1, _id: 0 })
    .lean();
  return category;
};

module.exports = {
  createCategory,
  getCategoriesByType,
  updateCategory,
  deleteCategory,
  categoryExist,
  getCategoryById
};
