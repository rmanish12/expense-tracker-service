const createItemReqBody = {
  type: "object",
  required: ["items"],
  additionalProperties: false,
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        required: ["categoryId", "amount", "description", "dateOfTransaction"],
        additionalProperties: false,
        properties: {
          categoryId: { type: "string" },
          amount: { type: "number" },
          description: { type: "string" },
          dateOfTransaction: { type: "string" }
        }
      }
    }
  }
};

const getItemsReqQuery = {
  type: "object",
  properties: {
    sortBy: {
      type: "string",
      enum: ["amount", "dateOfTransaction"]
    },
    sortOrder: {
      type: "string",
      enum: ["asc", "desc"]
    },
    limit: { type: "string" },
    offset: { type: "string" },
    fromDate: { type: "string" },
    toDate: { type: "string" }
  }
};

const itemGenericReqParams = {
  type: "object",
  required: ["itemId"],
  additionalProperties: false,
  properties: {
    itemId: { type: "string" }
  }
};

const updateItemReqBody = {
  type: "object",
  required: ["amount", "description", "dateOfTransaction"],
  additionalProperties: false,
  properties: {
    amount: { type: "number" },
    description: { type: "string" },
    dateOfTransaction: { type: "string" }
  }
};

module.exports = {
  createItemReqBody,
  itemGenericReqParams,
  updateItemReqBody,
  getItemsReqQuery
};
