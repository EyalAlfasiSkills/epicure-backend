const express = require("express");
const { getChefs, saveChef, deleteChef } = require("./chef.controller");
const router = express.Router();

router.get("/:chefId?", getChefs);

router.post("/", saveChef);

router.put("/", saveChef);

router.delete("/:chefId", deleteChef);

module.exports = router;
