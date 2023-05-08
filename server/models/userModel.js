const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter a full name"],
    },
    userName: {
      type: String,
      required: [true, "Please enter a username"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    role: {
      type: String,
      required: [true, "Please enter a role"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
