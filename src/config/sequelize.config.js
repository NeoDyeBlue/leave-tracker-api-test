const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  options: {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    //   logging: false, //disables sequelize logging
    //   storage: "./hr-services-leave-tracker.postgres",
  },
};
