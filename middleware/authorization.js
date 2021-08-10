const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"]; // bearer TOKEN

  const token = authHeaders && authHeaders.split(" ")[1];

  if (token === null) {
    return res.status(401).send({ error: "Null Token" });
  }
  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (error, user) => {
    if (error) {
      return res.status(403).send({ error: error.message });
    }
    req.user = user;

    next();
  });
};

module.exports = { authenticateToken };
