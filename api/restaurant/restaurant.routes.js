const express = require("express");
const {
  getRestaurants,
  saveRestaurant,
  deleteRestaurant,
} = require("./restaurant.controller");

const router = express.Router();

router.get("/:restaurantId?", getRestaurants);

router.post("/", saveRestaurant);

router.put("/", saveRestaurant);

router.delete("/:restaurantId", deleteRestaurant);

module.exports = router;
