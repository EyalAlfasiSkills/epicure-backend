const express = require("express");
const { searchAllEntities } = require("./main.controller");
const router = express.Router();

router.get("/all", searchAllEntities);

module.exports = router;
