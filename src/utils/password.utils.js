const bcrypt = require("bcrypt");

/**
 * Compares the raw and hashed password
 * @param {string} raw - raw password
 * @param {string} hashed - hashed password
 * @returns {boolean}
 */

async function comparePassword(raw, hashed) {
  return await bcrypt.compare(raw, hashed);
}

/**
 * Hashes the password
 * @param {string} password
 * @returns {string} Hashed password
 */

async function hashPassword(password) {
  const SALT_ROUNDS = 10;
  return await bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = { comparePassword, hashPassword };
