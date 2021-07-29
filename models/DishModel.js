const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dish = new Schema(
  {
    imgUrl: { type: String, default: null },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "restaurant",
      default: null,
    },
    name: { type: String, default: "" },
    ingredients: { type: String, default: "" },
    price: { type: Number, default: null },
    isSignature: { type: Boolean, default: false },
    types: { type: [String], default: [] },
  },
  { versionKey: false }
);

dish.index({ "$**": "text" });

module.exports = mongoose.model("dish", dish);
