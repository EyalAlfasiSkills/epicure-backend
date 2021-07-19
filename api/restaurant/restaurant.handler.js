const RestaurantModel = require("../../models/RestaurantModel");

async function queryRestaurants(params) {
  try {
    const filterBy = _filterBuilder(params);
    const restaurants = await RestaurantModel.find(filterBy).populate('chef')
    return restaurants.length > 1 ? restaurants : restaurants[0];
  } catch (err) {
    throw err;
  }
}

async function addRestaurant(restaurantData) {
  try {
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
      { new: true }
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
