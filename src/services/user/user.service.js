const { User } = require("../../models");
const { comparePassword } = require("../../utils");

/**
 * Registers a new user otherwise throw error if exists
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 * @throws Will throw an error if user/email exists.
 */

async function register(fullName, email, password) {
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new Error("Email already in use");
    }

    const newUser = await User.create({ fullName, email, password });

    return newUser;
  } catch (error) {
    throw error;
  }
}

/**
 * Checks if user credentials is valid
 * @param {string} email
 * @param {string} password
 * @returns {Object} User object
 * @throws Will throw an error if email/password is incorrect or by any reasons
 */

async function login(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Could not find user", { cause: "email" });
    }

    const isValid = comparePassword(password, user.password); // checks if password is valid

    if (isValid) {
      return user;
    } else {
      throw new Error("Password Incorrect", { cause: "password" });
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Returns a user object based on the specified properties
 * @param {Object} properties
 * @returns {Object} User object
 * @throws Throws an error back caused by any reasons
 */

async function findOneUser(properties) {
  try {
    const user = await User.findOne({ where: properties });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Returns a user object based on the primary key
 * @param {(string|number)} primaryKey
 * @returns {Object} User object
 * @throws Throws an error back caused by any reasons
 */

async function findUserByPk(primaryKey) {
  console.log(primaryKey);
  try {
    const user = await User.findByPk(primaryKey);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  login,
  findOneUser,
  findUserByPk,
};
