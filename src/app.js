const express = require("express");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./routes/auth");
const { sequelize } = require("./models");
const { port } = require("./config");

const app = express();

app.use(express.json());

// view routes for testing
app.get("/", (req, res) => {
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

app.use("/auth", authRoutes); // auth routes for login, signup, reset pass, and 3rd party auth

//initialize database, use {force: true} to recreate all tables
sequelize.sync().then(() => {
  app.listen(port);
  console.log(`Server started on port ${port}`);
});
