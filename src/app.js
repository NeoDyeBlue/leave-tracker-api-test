const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const { sequelize } = require("./models");
const { port } = require("./config/config");
const passport = require("passport");
const { viewAuthenticate } = require("./middleware/passport.middleware");
/**
 * -------------- GENERAL SETUP ----------------
 */

require("dotenv").config(); //for using the .env file

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

require("./config/passport.config")(passport);
app.use(passport.initialize());

app.use(cors());

/**
 * -------------- ROUTES ----------------
 */

// view routes for testing
app.get("/", viewAuthenticate, (req, res) => {
  res.sendFile(path.join(__dirname, "../src/views/index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/views/login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/views/signup.html"));
});
app.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/views/reset-password.html"));
});
app.get("/logout", (req, res) => {
  res.clearCookie("jwt").redirect("/login");
});

//api routes
app.use("/auth", authRoutes); // auth routes for login, signup, reset pass, and 3rd party auth

/**
 * -------------- SERVER ----------------
 */

//initialize database, use {force: true} to recreate all tables
sequelize.sync().then(() => {
  app.listen(port);
  console.log(`Server started on port ${port}`);
});
