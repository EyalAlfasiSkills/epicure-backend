const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurant = new Schema({
  imgUrl: String,
  name: String,
  chef: { type: Schema.Types.ObjectId, ref: "chef", default: null },
  dishes: [{ type: Schema.Types.ObjectId, ref: "dish" }],
  isPopular: { type: Boolean, default: false },
});

module.exports = mongoose.model("restaurant", restaurant);
