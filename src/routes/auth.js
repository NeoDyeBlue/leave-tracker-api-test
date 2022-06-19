const express = require("express");
const UserController = require("../controllers/user/user.controller");
const UserValidator = require("../controllers/user/user.validator");
const router = express.Router();

router.post("/login", (req, res) => {
  res.status(200).json({ message: "creds received" });
});

router.post("/signup", UserValidator.register, UserController.register);

module.exports = router;
