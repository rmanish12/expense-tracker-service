const router = require("express").Router();
const Schema = require("./item.schema");
const ItemController = require("../../controller/item.controller");
const { validateSchema } = require("../../config/ajv");

router.post(
  "/",
  validateSchema([{ data: "body", schema: Schema.createItemReqBody }]),
  ItemController.createItem
);

router.get("/download", ItemController.downloadItem);

router.get(
  "/:itemId",
  validateSchema([{ data: "params", schema: Schema.itemGenericReqParams }]),
  ItemController.getItemDetails
);

router.get(
  "/",
  validateSchema([{ data: "query", schema: Schema.getItemsReqQuery }]),
  ItemController.getItems
);

router.put(
  "/:itemId",
  validateSchema([
    { data: "params", schema: Schema.itemGenericReqParams },
    { data: "body", schema: Schema.updateItemReqBody }
  ]),
  ItemController.updatedItem
);

router.delete(
  "/:itemId",
  validateSchema([{ data: "params", schema: Schema.itemGenericReqParams }]),
  ItemController.deleteItem
);

module.exports = router;
