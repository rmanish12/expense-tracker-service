const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const CategorySchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    default: uuidv4()
  },
  name: {
    type: String,
    required: [true, "Name of category is required"]
  },
  budgetType: {
    type: String,
    enum: ["INCOME", "EXPENSE"],
    required: [true, "Budget type of category is required"]
  }
});

CategorySchema.set("timestamps", true);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
