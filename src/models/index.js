const fs = require("fs"); //include filesystem
const path = require("path"); //use for dealing relative paths absolute paths
const Sequelize = require("sequelize");
const dbConfig = require("../config/sequelize.config");
const db = {};

// declare sequelize object
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  dbConfig.options
);

// select all the files that is not equal to index.js we all want all the model file
// for every file we found we need to declare a model
// create a table if it doesn't exist

//= ==============================
// Generate all models
//= ==============================
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = sequelize;

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
db.Role.hasOne(db.User);
db.User.belongsTo(db.Role);

module.exports = db;
