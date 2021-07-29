const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurant = new Schema(
  {
    imgUrl: { type: String, default: null },
    name: { type: String, default: "" },
    chef: { type: Schema.Types.ObjectId, ref: "chef", default: "" },
    dishes: { type: Array, default: [] },
    isPopular: { type: Boolean, default: false },
  },
  { versionKey: false }
);

restaurant.index({ "$**": "text" });

module.exports = mongoose.model("restaurant", restaurant);
