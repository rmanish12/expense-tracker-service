const { StatusCodes } = require("http-status-codes");
const OverviewService = require("../services/overview.service");
const logger = require("../config/logger");

const getOverview = async (req, res, next) => {
  logger.info("Invoking request for getting overview");
  try {
    const { id: userId } = req.user;
    const { fromDate, toDate } = req.query;
    const overview = await OverviewService.getOverview({
      userId,
      fromDate,
      toDate
    });
    return res.status(StatusCodes.OK).send({ data: overview });
  } catch (err) {
    logger.error(`Error while getting overview ---> ${err}`);
    return next(err);
  }
};

module.exports = { getOverview };
