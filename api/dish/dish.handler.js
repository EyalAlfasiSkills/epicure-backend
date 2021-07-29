const DishModel = require("../../models/DishModel");

async function queryDishes(params) {
  try {
    const filterBy = _filterBuilder(params);
    const dishes = await DishModel.find(filterBy).populate("restaurant");
    return dishes.length > 1 ? dishes : dishes[0];
  } catch (err) {
    throw err;
  }
}

async function addDish(dishData) {
  try {
    const newDish = await DishModel.create(dishData);
    return newDish;
  } catch (err) {
    throw err;
  }
}

async function updateDish(dishData) {
  try {
    const updatedDish = await DishModel.findByIdAndUpdate(
      dishData._id,
      dishData,
      { new: true, useFindAndModify: true }
    );
    return updatedDish;
  } catch (err) {
    throw err;
  }
}

async function removeDish(dishId) {
  try {
    const removedDish = await DishModel.deleteOne({ _id: dishId });
    return removedDish;
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
  queryDishes,
  addDish,
  updateDish,
  removeDish,
};
