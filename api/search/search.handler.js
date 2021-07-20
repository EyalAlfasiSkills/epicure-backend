const ChefModel = require("../../models/ChefModel");
const DishModel = require("../../models/DishModel");
const RestaurantModel = require("../../models/RestaurantModel");

async function queryAll(searchStr) {
  if (!searchStr) return { chefs: [], dishes: [], restaurants: [] };
  try {
    // { $regex: /veal/i, $options: "i" }
    const regExp = { $regex: escape(searchStr), $options: "i" };

    const chefResults = ChefModel.find({
      $or: [{ name: regExp }, { about: regExp }],
    });
    const dishResults = DishModel.find({
      $or: [{ name: regExp }, { ingredients: regExp }, { types: regExp }],
    });
    const restaurantResults = RestaurantModel.find({
      $or: [{ name: regExp }],
    });

    const [chefs, dishes, restaurants] = await Promise.all([
      chefResults,
      dishResults,
      restaurantResults,
    ]);
    return { chefs, dishes, restaurants };
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

module.exports = {
  queryAll,
};
