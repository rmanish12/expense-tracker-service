const router = require("express").Router();
const OverviewController = require("../../controller/overview.controller");
const OverviewSchema = require("./overview.schema");
const { validateSchema } = require("../../config/ajv");

router.get(
  "/",
  validateSchema([{ data: "query", schema: OverviewSchema.overviewReqQuery }]),
  OverviewController.getOverview
);

module.exports = router;
