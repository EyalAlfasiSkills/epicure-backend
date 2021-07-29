const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: String,
    email: String,
    isAdmin: { type: Boolean, default: false },
    password: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", user);
