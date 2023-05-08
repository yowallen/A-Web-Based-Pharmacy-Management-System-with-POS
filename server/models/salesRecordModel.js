const mongoose = require("mongoose");

const salesRecordSchema = new mongoose.Schema({
  totalSales: {
    type: Number,
  },
  totalProducts: {
    type: Number,
  },
  orders: {
    type: Array,
  },
  history: {
    type: Array,
  },
});

module.exports = mongoose.model("SalesRecord", salesRecordSchema);
