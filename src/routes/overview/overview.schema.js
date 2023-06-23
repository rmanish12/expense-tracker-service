const overviewReqQuery = {
  type: "object",
  additionalProperties: false,
  properties: {
    fromDate: { type: "string" },
    toDate: { type: "string" }
  }
};

module.exports = { overviewReqQuery };
