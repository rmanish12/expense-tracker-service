const { v4: uuidv4 } = require("uuid");
const Item = require("../models/item.model");

const getItemById = async itemId => {
  const item = await Item.findById(itemId)
    .populate("userId", { email: 1, _id: 0 })
    .exec();
  return item;
};

const createItem = async ({ userId, items }) => {
  const modelItems = items.map(item => {
    const { categoryId, amount, description, dateOfTransaction } = item;
    return new Item({
      _id: uuidv4(),
      userId,
      categoryId,
      amount,
      description,
      dateOfTransaction
    });
  });

  return Item.bulkSave(modelItems);
};

const getItems = async ({ userId, sortBy, sortOrder, limit, offset }) => {
  const items = await Item.find({ userId })
    .select({
      _id: 1,
      amount: 1,
      dateOfTransaction: 1,
      categoryId: 1
    })
    .populate("categoryId", { name: 1, budgetType: 1, _id: 0 })
    .sort({ [sortBy]: sortOrder })
    .limit(limit)
    .skip(offset)
    .lean();
  return items;
};

const getItemsInDateRange = async ({
  userId,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  limit,
  offset
}) => {
  const items = await Item.find({ userId })
    .where({ dateOfTransaction: { $gte: fromDate, $lte: toDate } })
    .select({
      _id: 1,
      amount: 1,
      dateOfTransaction: 1,
      categoryId: 1
    })
    .populate("categoryId", { name: 1, budgetType: 1, _id: 0 })
    .sort({ [sortBy]: sortOrder })
    .limit(limit)
    .skip(offset)
    .lean();
  return items;
};

const getItemDetails = async itemId => {
  const item = await Item.findById(itemId)
    .select({
      _id: 1,
      userId: 1,
      amount: 1,
      dateOfTransaction: 1,
      description: 1,
      categoryId: 1
    })
    .populate("userId", { email: 1, _id: 0 })
    .populate("categoryId", { name: 1, budgetType: 1, _id: 0 })
    .lean();
  return item;
};

const updateItem = async ({ item, amount, description, dateOfTransaction }) => {
  item.amount = amount;
  item.description = description;
  item.dateOfTransaction = dateOfTransaction;

  return item.save();
};

const deleteItem = async itemId => Item.findByIdAndDelete(itemId);

const itemExist = async itemId => Item.exists().where("_id", itemId).exec();

const getItemsOverview = async ({ userId, fromDate, toDate }) => {
  const items = await Item.find({ userId })
    .where({ dateOfTransaction: { $gte: fromDate, $lte: toDate } })
    .select({ amount: 1, category: 1 })
    .populate("categoryId", { name: 1, budgetType: 1, _id: 0 })
    .lean();
  return items;
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getItemDetails,
  getItemById,
  itemExist,
  getItemsOverview,
  getItemsInDateRange
};
