const jwt = require("jsonwebtoken");

async function validateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const authRefreshHeader = req.headers["authorizationRefresh"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    const authRefreshToken = authHeader && authRefreshHeader.split(" ")[1];
    if (!accessToken) {
      res.status(401).send("No token provided");
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        jwt.verify(
          authRefreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, user) => {
            if (err) {
              return res.status(401).send(err);
            }
            next()
          }
        );
        return res.status(403).send(err);
      }
      req.user = user;
      
      next();
    });
  } catch (err) {
    res.status(403).send("Unuthorized access with error: " + err);
  }
}

module.exports = {
  validateToken,
};
