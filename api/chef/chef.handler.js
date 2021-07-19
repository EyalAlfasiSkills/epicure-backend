const ChefModel = require("../../models/ChefModel");

async function queryChefs(params) {
  try {
    const filterBy = _filterBuilder(params);
    const chefs = await ChefModel.find(filterBy).populate('restaurants');
    return chefs.length > 1 ? chefs : chefs[0];
  } catch (err) {
    throw err;
  }
}

async function addChef(chefData) {
  try {
    const newChef = await ChefModel.create(chefData);
    return newChef;
  } catch (err) {
    throw err;
  }
}

async function updateChef(chefData) {
  try {
    const updatedChef = await ChefModel.findByIdAndUpdate(
      chefData._id,
      chefData,
      { new: true }
    );
    return updatedChef;
  } catch (err) {
    throw err;
  }
}

async function removeChef(chefId) {
  try {
    const removedChef = await ChefModel.deleteOne({ _id: chefId });
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
  addChef,
  updateChef,
  removeChef,
};
