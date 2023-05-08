const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    product: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    soldBy: {
      type: String,
    },
    price: {
      type: Number,
    },
    receipt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sales", salesSchema);
