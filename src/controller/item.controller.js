const { StatusCodes } = require("http-status-codes");
const ItemService = require("../services/item.service");
const logger = require("../config/logger");

const createItem = async (req, res, next) => {
  logger.info("Invoking request for creating item");
  try {
    const { id: userId } = req.user;
    const { items } = req.body;
    const itemsCreated = await ItemService.createItem({
      userId,
      items
    });
    return res.status(StatusCodes.CREATED).send({ data: itemsCreated });
  } catch (err) {
    logger.error(`Error while creating item ---> ${err}`);
    return next(err);
  }
};

const getItems = async (req, res, next) => {
  logger.info("Invoking request for getting items");
  try {
    const { id } = req.user;
    const { sortBy, sortOrder, limit, offset } = req.query;
    const items = await ItemService.getItems({
      userId: id,
      sortBy,
      sortOrder,
      limit,
      offset
    });
    return res.status(StatusCodes.OK).send({ data: items });
  } catch (err) {
    logger.error(`Error while getting items --> ${err}`);
    return next(err);
  }
};

const getItemDetails = async (req, res, next) => {
  logger.info("Invoking request for getting item");
  try {
    const { email } = req.user;
    const { itemId } = req.params;
    const item = await ItemService.getItemDetails({ email, itemId });
    return res.status(StatusCodes.OK).send({ data: item });
  } catch (err) {
    logger.error(`Error while getting item ---> ${err}`);
    return next(err);
  }
};

const updatedItem = async (req, res, next) => {
  logger.info("Invoking request for updating item");
  try {
    const { email, id: userId } = req.user;
    const { itemId } = req.params;
    const { amount, dateOfTransaction, description } = req.body;
    const item = await ItemService.updateItem({
      email,
      userId,
      itemId,
      amount,
      description,
      dateOfTransaction
    });
    return res.status(StatusCodes.OK).send({ data: item });
  } catch (err) {
    logger.error(`Error while updating items ---> ${err}`);
    return next(err);
  }
};

const deleteItem = async (req, res, next) => {
  logger.info("Invoking request for deleting item");
  try {
    const { email, id: userId } = req.user;
    const { itemId } = req.params;
    const items = await ItemService.deleteItem({ email, userId, itemId });
    return res.status(StatusCodes.OK).send({ data: items });
  } catch (err) {
    logger.error(`Error while deleting item ---> ${err}`);
    return next(err);
  }
};

const downloadItem = async (req, res, next) => {
  logger.info("Invoking request for downloading items");
  try {
    // const { id: userId } = req.user;
    const workbook = await ItemService.downloadItems(
      "782993c3-ab9b-43f1-a9a5-486503e35a0d"
    );
    const fileName = `Item-${new Date()}`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.xlsx`
    );

    return workbook.xlsx.write(res).then(() => {
      res.status(StatusCodes.OK).end();
    });
  } catch (err) {
    logger.error(`Error while downloading items ---> ${err}`);
    return next(err);
  }
};

module.exports = {
  createItem,
  getItems,
  updatedItem,
  deleteItem,
  getItemDetails,
  downloadItem
};
