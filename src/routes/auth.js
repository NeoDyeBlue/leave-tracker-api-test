const express = require("express");
const UserController = require("../controllers/user/user.controller");
const UserValidator = require("../controllers/user/user.validator");
const passport = require("passport");
const router = express.Router();

router.post(
  "/login",
  UserValidator.login,
  passport.authenticate("local", {
    successMessage: "success",
    failureMessage: "something went wrong",
  }),
  (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "creds received" });
  }
);

router.post("/signup", UserValidator.register, UserController.register);

module.exports = router;
