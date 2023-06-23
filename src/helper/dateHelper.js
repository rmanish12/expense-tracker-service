const isEmpty = require("lodash.isempty");
const moment = require("moment");

const getDates = (fromDate, toDate) => {
  let startDate;
  let endDate;
  if (isEmpty(fromDate) || isEmpty(toDate)) {
    // consider current month
    startDate = moment().startOf("month").format("YYYY-MM-DDT00:00:00.000");
    endDate = moment().endOf("month").format("YYYY-MM-DDT00:00:00.000");
  } else {
    startDate = fromDate;
    endDate = toDate;
  }

  return { startDate, endDate };
};

module.exports = { getDates };
