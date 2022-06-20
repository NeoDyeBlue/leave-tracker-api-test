const express = require("express");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./routes/auth");
const { sequelize } = require("./models");
const { port } = require("./config/config");
const passport = require("passport");

var SequelizeStore = require("connect-session-sequelize")(session.Store); // initalize sequelize with session store

/**
 * -------------- GENERAL SETUP ----------------
 */

require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); //for using the .env file

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

require("./config/passport.config");

app.use(passport.initialize());
app.use(passport.session());

/** for debugging the session */
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */

// view routes for testing
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../src/views/index.html"));
  } else {
    res.redirect("/login");
  }
});
app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "../src/views/login.html"));
  }
});
app.get("/signup", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "../src/views/signup.html"));
  }
});
app.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/views/reset-password.html"));
});
app.get("/logout", (req, res) => {
  req.logout(function (error) {
    res.redirect("/login");
  });
});

//api routes
app.use("/auth", authRoutes); // auth routes for login, signup, reset pass, and 3rd party auth

/**
 * -------------- SERVER ----------------
 */

//initialize database, use {force: true} to recreate all tables
sessionStore.sync().then(() => {
  app.listen(port);
  console.log(`Server started on port ${port}`);
});
