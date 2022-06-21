const express = require("express");
const UserController = require("../controllers/user/user.controller");
const UserValidator = require("../controllers/user/user.validator");
const router = express.Router();
const PassportMiddleware = require("../middleware/passport.middleware");

router.post("/login", UserValidator.login, UserController.login);

router.post("/signup", UserValidator.register, UserController.register);

router.get("/protected", PassportMiddleware.authenticate, (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome to protected route ${req.user.name}` });
});

module.exports = router;
