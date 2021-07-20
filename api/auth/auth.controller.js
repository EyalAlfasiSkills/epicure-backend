const UserModel = require("../../models/UserModel");
const authHandler = require("./auth.handler");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        message: "Auth failed",
      });
    }
    const user = await authHandler.login({ email, password });
    if (!user) {
      res.status(401).json({
        message: "Auth failed",
      });
    }
    res.status(200).json({
      message: "Auth successfull",
      user,
    });
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = {
  login,
};
