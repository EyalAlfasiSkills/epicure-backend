const { queryRestaurants, addRestaurant, updateRestaurant, removeRestaurant } = require("./restaurant.handler");

async function getRestaurants(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurants = await queryRestaurants({ _id: restaurantId });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function saveRestaurant(req, res) {
  try {
    const restaurantData = req.body;
    if (!restaurantData) {
      res
        .status(404)
        .send("No restaurant data was included in the request body");
    }
    if (!restaurantData._id) {
      const newRestaurant = await addRestaurant(restaurantData);
      res.status(201).send(newRestaurant);
    }
    const updatedRestaurant = await updateRestaurant(restaurantData);
    res.status(200).send(updatedRestaurant);
  } catch (err) {
    res.status(422).send(err);
  }
}

async function deleteRestaurant(req, res) {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      res.status(404).send("restaurantId is not provided in the url params");
    }
    const removedRestaurant = await removeRestaurant(restaurantId);
    res.status(200).send(removedRestaurant);
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = {
  getRestaurants,
  saveRestaurant,
  deleteRestaurant,
};
