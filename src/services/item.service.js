/* eslint-disable no-underscore-dangle */
const ItemRepo = require("../repository/item.repo");
const logger = require("../config/logger");
const { NotFoundError, ForbiddenError } = require("../errors");
const mongoose = require("../config/db");
const { generateExcel } = require("../helper/generateExcel");
const { getDates } = require("../helper/dateHelper");

const getItemsResponseMapper = items => {
  const objMapper = itemObj => {
    const obj = {
      ...itemObj,
      id: itemObj._id,
      categoryInfo: { ...itemObj.categoryId }
    };
    delete obj._id;
    delete obj.categoryId;
    delete obj.userId;
    return obj;
  };
  let modifiedItems = {};
  if (Array.isArray(items)) {
    modifiedItems = items.map(item => objMapper(item));
  } else {
    modifiedItems = objMapper(items);
  }

  return modifiedItems;
};

const checkItem = async (itemId, email) => {
  const item = await ItemRepo.getItemById(itemId);

  if (!item) {
    throw new NotFoundError("Item not found");
  }

  if (item.userId.email !== email) {
    throw new ForbiddenError("Insufficient access");
  }

  return item;
};

const getItems = async ({
  userId,
  sortBy,
  sortOrder,
  limit,
  offset,
  fromDate,
  toDate
}) => {
  const { startDate, endDate } = getDates(fromDate, toDate);
  try {
    const items = await ItemRepo.getItemsInDateRange({
      userId,
      sortBy: sortBy || "dateOfTransaction",
      sortOrder: sortOrder || "desc",
      limit: limit || 10,
      offset: offset || 0,
      fromDate: startDate,
      toDate: endDate
    });

    return getItemsResponseMapper(items);
  } catch (err) {
    logger.error(`Error while getting items --> ${err}`);
    throw err;
  }
};

const createItem = async ({ userId, items }) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await ItemRepo.createItem({
      userId,
      items
    });
    await session.commitTransaction();
    return getItems({ userId });
  } catch (err) {
    logger.error(`Error while creating item ---> ${err}`);
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const getItemDetails = async ({ email, itemId }) => {
  try {
    const itemExist = await ItemRepo.itemExist(itemId);

    if (!itemExist) {
      throw new NotFoundError("Item does not exist");
    }
    const itemDetails = await ItemRepo.getItemDetails(itemId);

    if (!itemId) {
      throw new NotFoundError("Item not found");
    }

    if (itemDetails.userId.email !== email) {
      throw new ForbiddenError("Insufficient access");
    }

    return getItemsResponseMapper(itemDetails);
  } catch (err) {
    logger.error(`Error while getting item ---> ${err}`);
    throw err;
  }
};

const updateItem = async ({
  itemId,
  email,
  userId,
  amount,
  description,
  dateOfTransaction
}) => {
  try {
    const item = await checkItem(itemId, email);

    await ItemRepo.updateItem({
      item,
      amount,
      description,
      dateOfTransaction
    });
    return getItems({ userId });
  } catch (err) {
    logger.error(`Error while updating items ---> ${err}`);
    throw err;
  }
};

const deleteItem = async ({ email, userId, itemId }) => {
  try {
    await checkItem(itemId, email);
    await ItemRepo.deleteItem(itemId);

    return getItems({ userId });
  } catch (err) {
    logger.error(`Error while deleting item ---> ${err}`);
    throw err;
  }
};

const downloadItems = async userId => {
  try {
    const items = await getItems({ userId, limit: 10000 });

    const workbook = await generateExcel(items);

    return workbook;
  } catch (err) {
    logger.error(`Error while downloading items ---> ${err}`);
    throw err;
  }
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getItemDetails,
  downloadItems
};
