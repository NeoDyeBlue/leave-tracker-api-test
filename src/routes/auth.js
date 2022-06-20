const express = require("express");
const UserController = require("../controllers/user/user.controller");
const UserValidator = require("../controllers/user/user.validator");
const router = express.Router();
const PassportMiddleware = require("../middleware/passport.middleware");

router.post("/login", UserValidator.login, PassportMiddleware.authenticate);

router.post("/signup", UserValidator.register, UserController.register);

module.exports = router;
