const { sendAuth, authRefToken } = require("../models/login.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../utlis/jwt-helper");

exports.authUser = (req, res, next) => {
  const { user_email, user_password } = req.body;

  sendAuth(user_email, user_password)
    .then(async (user) => {
      // Email Check
      if (user.length === 0)
        return res.status(401).send({ error: "email is invalid!" });
      // Password Check
      const validPassword = await bcrypt.compare(
        user_password,
        user[0].user_password
      );
      if (!validPassword) {
        return res.status(401).send({ error: "password is incorrect" });
      }

      // JWT
      let tokens = jwtTokens(user[0]);

      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.send(tokens);
    })
    .catch((error) => {
      console.log(error);
    });
};

// exports.refToken = (req, res, next) => {
//   const refreshToken = req.cookies.refresh_token;
//   console.log(refreshToken);
//   const { user_email } = req.body;
//   // authRefToken(user_email).then((user) => {
//   if (refreshToken === null)
//     return res.status(401).send({ error: "Null refresh token" });
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
//     if (error) return res.status(403).send({ error: error.message });
//     let tokens = jwtTokens(user[0]);
//     res.cookie("refresh_token", tokens.refreshToken, {
//       httpOnly: true,
//       sameSite: "none",
//       secure: true,
//     });

//     res.send(tokens);
//     // })
//     // .catch((error) => {
//     //   res.status(401).send({ error: error.message });
//     // });
//   });
// };

// exports.delRfToken = (req, res, next) => {
//   res.clearCookie("refresh_token");
//   return res
//     .status(200)
//     .send({ message: "refresh token deleted" })
//     .catch((error) => {
//       res.status(401).send({ error: error.message });
//     });
// };
