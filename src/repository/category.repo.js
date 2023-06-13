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

module.exports = {
  createCategory,
  getCategoriesByType,
  updateCategory,
  deleteCategory,
  categoryExist
};
