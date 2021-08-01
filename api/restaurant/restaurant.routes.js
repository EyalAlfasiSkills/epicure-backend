const express = require("express");
const { validateToken } = require("../../middlewares/tokenAuthentication");
const {
  validateCognitoAccessToken,
} = require("../../middlewares/validateCognitoAccessToken");
const {
  getRestaurants,
  saveRestaurant,
  deleteRestaurant,
} = require("./restaurant.controller");

const router = express.Router();

router.get("/:restaurantId?", getRestaurants);

router.post("/", validateCognitoAccessToken, saveRestaurant);

router.put("/", validateCognitoAccessToken, saveRestaurant);

router.delete("/:restaurantId", validateCognitoAccessToken, deleteRestaurant);

module.exports = router;
