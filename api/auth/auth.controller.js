const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const authHandler = require("./auth.handler");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const loginResponse = await authHandler.login({ email, password });
    res.status(201).json(loginResponse);
  } catch (err) {
    res.status(401).send(err);
  }
}

// async function login(req, res) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(401).json({
//         message: "Auth failed",
//       });
//     }
//     const user = await authHandler.login({ email, password });
//     if (!user) {
//       return res.status(401).json({
//         message: "Auth failed",
//       });
//     }
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "1m",
//     });
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: "5m",
//     });
//     return res.status(200).json({
//       message: "Auth successfull",
//       accessToken,
//       refreshToken,
//       user,
//     });
//   } catch (err) {
//     return res.status(404).send(err);
//   }
// }

module.exports = {
  login,
};
