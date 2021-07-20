const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chef = new Schema({
  name: String,
  restaurants: [{ type: Schema.Types.ObjectId, ref: "restaurant" }],
  imgUrl: String,
  about: String,
});

chef.index({ "$**": "text" });

module.exports = mongoose.model("chef", chef);
