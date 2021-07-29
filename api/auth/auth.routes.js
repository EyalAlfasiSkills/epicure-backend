const express = require("express");
const { validateToken } = require("../../middlewares/tokenAuthentication");
const {
  refreshToken,
} = require("../../middlewares/validateCognitoAccessToken");
const { login } = require("./auth.controller");
const router = express.Router();

router.post("/login", login);
router.post("/refresh-token", refreshToken);

module.exports = router;
