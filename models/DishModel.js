const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dish = new Schema({
  imgUrl: String,
  restaurant: { type: Schema.Types.ObjectId, ref: "restaurant", default: null },
  name: String,
  ingredients: String,
  price: Number,
  isSignature: { type: Boolean, default: false },
  types: { type: [String], default: [] },
});

dish.index({ "$**": "text" });

module.exports = mongoose.model("dish", dish);
