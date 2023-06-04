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
    cost: {
      type: Number,
    },
    totalEarnings: {
      type: Number,
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
