const createCategoryReqBody = {
  type: "object",
  required: ["name", "budgetType"],
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    budgetType: {
      type: "string",
      enum: ["INCOME", "EXPENSE"]
    }
  }
};

const getCategoriesByTypeReqParams = {
  type: "object",
  required: ["budgetType"],
  additionalProperties: false,
  properties: {
    budgetType: {
      type: "string",
      enum: ["income", "expense"]
    }
  }
};

const categoryGenericReqParams = {
  type: "object",
  required: ["categoryId"],
  additionalProperties: false,
  properties: {
    categoryId: { type: "string" }
  }
};

const updateCategoryReqBody = {
  type: "object",
  required: ["name"],
  additionalProperties: false,
  properties: {
    name: { type: "string" }
  }
};

module.exports = {
  createCategoryReqBody,
  getCategoriesByTypeReqParams,
  categoryGenericReqParams,
  updateCategoryReqBody
};
