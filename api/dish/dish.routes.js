const express = require("express");
const { validateToken } = require("../../middlewares/tokenAuthentication");
const {
  validateCognitoAccessToken,
} = require("../../middlewares/validateCognitoAccessToken");
const { saveDish, deleteDish, getDishes } = require("./dish.controller");
const router = express.Router();

router.get("/:dishId?", getDishes);

router.post("/", validateCognitoAccessToken, saveDish);

router.put("/", validateCognitoAccessToken, saveDish);

router.delete("/:dishId", validateCognitoAccessToken, deleteDish);

module.exports = router;
