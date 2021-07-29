const {
  queryRestaurants,
  addRestaurant,
  updateRestaurant,
  removeRestaurant,
} = require("./restaurant.handler");

async function getRestaurants(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurants = await queryRestaurants({ _id: restaurantId });
    return res.status(200).json(restaurants);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function saveRestaurant(req, res) {
  try {
    const restaurantData = req.body;
    if (!restaurantData) {
      return res
        .status(404)
        .send("No restaurant data was included in the request body");
    }
    if (!restaurantData._id) {
      const newRestaurant = await addRestaurant(restaurantData);
      return res.status(201).json(newRestaurant);
    }
    const updatedRestaurant = await updateRestaurant(restaurantData);
    return res.status(200).json(updatedRestaurant);
  } catch (err) {
    return res.status(422).send(err);
  }
}

async function deleteRestaurant(req, res) {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      return res
        .status(404)
        .send("restaurantId is not provided in the url params");
    }
    const removedRestaurant = await removeRestaurant(restaurantId);
    return res.status(200).json(removedRestaurant);
  } catch (err) {
    return res.status(404).send(err);
  }
}

module.exports = {
  getRestaurants,
  saveRestaurant,
  deleteRestaurant,
};
