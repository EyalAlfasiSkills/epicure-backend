const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chef = new Schema(
  {
    name: String,
    restaurants: { type: Array, default: [] },
    imgUrl: { type: String, default: null },
    about: { type: String, default: "" },
  },
  { versionKey: false }
);

chef.index({ "$**": "text" });

module.exports = mongoose.model("chef", chef);
