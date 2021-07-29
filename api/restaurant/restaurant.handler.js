const mongoose = require("mongoose");
const ChefModel = require("../../models/ChefModel");
const makeObjectId = mongoose.Types.ObjectId;
const DishModel = require("../../models/DishModel");
const RestaurantModel = require("../../models/RestaurantModel");

async function queryRestaurants(params) {
  try {
    const pipeline = [
      {
        $lookup: {
          from: ChefModel.collection.collectionName,
          localField: "chef",
          foreignField: "_id",
          as: "chef",
        },
      },
      { $unwind: { path: "$chef", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: DishModel.collection.collectionName,
          localField: "_id",
          foreignField: "restaurant",
          as: "dishes",
        },
      },
    ];
    if (params._id) pipeline.unshift({ $match: { _id: params._id } });
    let restaurants = await RestaurantModel.aggregate(pipeline);
    return restaurants.length > 1 ? restaurants : restaurants[0];
  } catch (err) {
    throw err;
  }
}

async function addRestaurant(restaurantData) {
  try {
    restaurantData.chef = makeObjectId(restaurantData.chef);
    const newRestaurant = await RestaurantModel.create(restaurantData);
    return newRestaurant;
  } catch (err) {
    throw err;
  }
}

async function updateRestaurant(restaurantData) {
  try {
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      restaurantData._id,
      restaurantData,
      { new: true, useFindAndModify: true }
    );
    return updatedRestaurant;
  } catch (err) {
    throw err;
  }
}

async function removeRestaurant(restaurantId) {
  try {
    const removedRestaurant = await RestaurantModel.deleteOne({
      _id: restaurantId,
    });
    const dishesToDelete = await DishModel.find({ restaurant: restaurantId });
    const dishIds = dishesToDelete.map((dish) => dish._id);
    await DishModel.deleteMany({ _id: { $in: dishIds } });
    return removedRestaurant;
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
  queryRestaurants,
  addRestaurant,
  updateRestaurant,
  removeRestaurant,
};
