const express = require("express");
const { saveDish, deleteDish, getDishes } = require("./dish.controller");
const router = express.Router();

router.get("/:dishId?", getDishes);

router.post("/", saveDish);

router.put("/", saveDish);

router.delete("/:dishId", deleteDish);

module.exports = router;
