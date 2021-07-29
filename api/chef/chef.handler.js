const mongoose = require("mongoose");
const ChefModel = require("../../models/ChefModel");
const RestaurantModel = require("../../models/RestaurantModel");
const ChefOfTheWeekModel = require("../../models/ChefOfTheWeekModel");
const DishModel = require("../../models/DishModel");
const makeObjectId = mongoose.Types.ObjectId;

async function queryChefs(params) {
  try {
    const pipeline = [
      {
        $lookup: {
          from: RestaurantModel.collection.collectionName,
          localField: "_id",
          foreignField: "chef",
          as: "restaurants",
        },
      },
    ];
    if (params._id) pipeline.unshift({ $match: { _id: params._id } });
    const chefs = await ChefModel.aggregate(pipeline);
    return chefs.length > 1 ? chefs : chefs[0];
  } catch (err) {
    throw err;
  }
}

async function getChefOfTheWeek() {
  try {
    const [chef] = await ChefOfTheWeekModel.aggregate([
      {
        $lookup: {
          from: ChefModel.collection.collectionName,
          localField: "chef",
          foreignField: "_id",
          as: "chef",
        },
      },
      { $unwind: "$chef" },
      {
        $lookup: {
          from: RestaurantModel.collection.collectionName,
          localField: "chef._id",
          foreignField: "chef",
          as: "chef.restaurants",
        },
      },
      { $replaceRoot: { newRoot: "$chef" } },
    ]);
    return chef;
  } catch (err) {
    throw err;
  }
}

async function setChefOfTheWeek(chefId) {
  try {
    const chef = await ChefOfTheWeekModel.updateOne({
      chef: makeObjectId(chefId),
    });
    return chef;
  } catch (err) {
    throw err;
  }
}

async function addChef(chefData) {
  try {
    const newChef = new ChefModel(chefData);
    const savedChef = await newChef.save();
    return savedChef;
  } catch (err) {
    throw err;
  }
}

async function updateChef(chefData) {
  try {
    const updatedChef = await ChefModel.findByIdAndUpdate(
      chefData._id,
      chefData,
      { new: true, useFindAndModify: true }
    );
    return updatedChef;
  } catch (err) {
    throw err;
  }
}

async function deleteChef(chefId) {
  try {
    const removedChef = await ChefModel.deleteOne({ _id: chefId });
    const restaurantsToDelete = await RestaurantModel.find({ chef: chefId });
    const restaurantIds = restaurantsToDelete.map((rest) => rest._id);
    const dishesToDelete = await DishModel.find({
      restaurant: { $in: restaurantIds },
    });
    const dishIds = dishesToDelete.map((dish) => dish._id);
    await RestaurantModel.deleteMany({ _id: { $in: restaurantIds } });
    await DishModel.deleteMany({ _id: { $in: dishIds } });
    return removedChef;
  } catch (err) {
    throw err;
  }
}

function _filterBuilder(params) {
  const filter = {};
  if (params._id) {
    filter._id = params._id;
  }
  return filter;
}

module.exports = {
  queryChefs,
  getChefOfTheWeek,
  setChefOfTheWeek,
  addChef,
  updateChef,
  deleteChef,
};
