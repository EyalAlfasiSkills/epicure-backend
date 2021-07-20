const express = require("express");
const {
  getChefs,
  saveChef,
  deleteChef,
  getChefOfTheWeek,
  setChefOfTheWeek
} = require("./chef.controller");
const router = express.Router();

router.get("/chef-of-the-week", getChefOfTheWeek);

router.patch("/chef-of-the-week", setChefOfTheWeek);

router.get("/:chefId?", getChefs);

router.post("/", saveChef);

router.put("/", saveChef);

router.delete("/:chefId", deleteChef);

module.exports = router;
