const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    measurement: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    cost: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    prescriptionRequired: {
      type: Boolean,
      required: true,
    },
    isExpired: {
      type: Boolean,
    },
    stockedIn: {
      type: Number,
    },
    stockedAvailable: {
      type: Number,
    },
    productLimit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
