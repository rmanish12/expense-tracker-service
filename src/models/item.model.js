const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ItemSchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    default: uuidv4()
  },
  userId: {
    type: Schema.Types.UUID,
    required: [true, "User id is requied for item"]
  },
  amount: {
    type: Number,
    required: [true, "Amount is requied for item"]
  },
  description: {
    type: String
  },
  dateOfTransaction: {
    type: Date,
    required: [true, "Date is required for item"]
  },
  categoryId: {
    type: String.Types.UUID,
    required: [true, "Category id is required for item"]
  }
});

ItemSchema.set("timestamps", true);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;