const express = require("express");
const {
  getChefs,
  saveChef,
  deleteChef,
  getChefOfTheWeek,
  setNewChefOfTheWeek
} = require("./chef.controller");
const router = express.Router();

router.get("/chef-of-the-week", getChefOfTheWeek);

router.patch("/chef-of-the-week", setNewChefOfTheWeek);

router.get("/:chefId?", getChefs);

router.post("/", saveChef);

router.put("/", saveChef);

router.delete("/:chefId", deleteChef);

module.exports = router;
