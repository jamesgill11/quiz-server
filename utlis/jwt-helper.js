const jwt = require("jsonwebtoken");

const jwtTokens = ({
  user_id,
  user_email,
  user_firstName,
  user_lastName,
  user_score,
}) => {
  const user = {
    user_id,
    user_email,
    user_firstName,
    user_lastName,
    user_score,
  };

  const accessToken = jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(user, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "14d",
  });

  return { accessToken, refreshToken };
};

module.exports = { jwtTokens };
