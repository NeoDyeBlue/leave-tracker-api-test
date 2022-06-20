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

    await User.create({ fullName, email, password });
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {}

/**
 * Returns a user data based on the specified properties
 * @param {Object} properties
 * @returns {Object} User data
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
 * Returns a user data based on the primary key
 * @param {(string|number)} primaryKey
 * @returns {Object} User data
 * @throws Throws an error back caused by any reasons
 */

async function findUserByPk(primaryKey) {
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
