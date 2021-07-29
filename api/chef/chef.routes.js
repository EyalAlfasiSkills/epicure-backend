const express = require("express");
const { validateToken } = require("../../middlewares/tokenAuthentication");
const {
  validateCognitoAccessToken,
} = require("../../middlewares/validateCognitoAccessToken");
const {
  getChefs,
  saveChef,
  deleteChef,
  getChefOfTheWeek,
  setChefOfTheWeek,
} = require("./chef.controller");
const router = express.Router();

router.get("/chef-of-the-week", getChefOfTheWeek);

router.patch("/chef-of-the-week", validateCognitoAccessToken, setChefOfTheWeek);

router.get("/:chefId?", validateCognitoAccessToken, getChefs);

router.post("/", saveChef);

router.put("/", validateCognitoAccessToken, saveChef);

router.delete("/:chefId", validateCognitoAccessToken, deleteChef);

module.exports = router;
