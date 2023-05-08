const mongoose = require("mongoose");

const expiredSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    expiredDate: {
      type: Date,
    },
    productInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expired", expiredSchema);
