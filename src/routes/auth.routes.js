const express = require("express");
const UserController = require("../controllers/user/user.controller");
const UserValidator = require("../controllers/user/user.validator");
const router = express.Router();
const passport = require("passport");
const PassportMiddleware = require("../middleware/passport.middleware");

router.post("/login", UserValidator.login, UserController.login);

router.post("/signup", UserValidator.register, UserController.register);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  UserController.generateCookieToken
);

router.get("/protected", PassportMiddleware.authenticate, (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome to protected route ${req.user.name}` });
});

module.exports = router;
