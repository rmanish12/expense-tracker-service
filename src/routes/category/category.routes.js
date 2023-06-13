const router = require("express").Router();
const CategoryController = require("../../controller/category.controller");
const { validateSchema } = require("../../config/ajv");
const authorization = require("../../middlewares/authorization");
const Schema = require("./category.schema");

router.post(
  "/",
  [
    authorization,
    validateSchema([{ data: "body", schema: Schema.createCategoryReqBody }])
  ],
  CategoryController.createCategory
);

router.get(
  "/:budgetType",
  validateSchema([
    { data: "params", schema: Schema.getCategoriesByTypeReqParams }
  ]),
  CategoryController.getCategoriesByType
);

router.put(
  "/:categoryId",
  [
    authorization,
    validateSchema([
      { data: "params", schema: Schema.categoryGenericReqParams },
      { data: "body", schema: Schema.updateCategoryReqBody }
    ])
  ],
  CategoryController.updateCategory
);

router.delete(
  "/:categoryId",
  [
    authorization,
    validateSchema([
      { data: "params", schema: Schema.categoryGenericReqParams }
    ])
  ],
  CategoryController.deleteCategory
);

module.exports = router;
