const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chefOfThWeek = new Schema({
  chef: { type: Schema.Types.ObjectId, ref: "chef" },
});

module.exports = mongoose.model("chefoftheweek", chefOfThWeek);
