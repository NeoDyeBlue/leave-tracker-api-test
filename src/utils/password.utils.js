const bcrypt = require("bcrypt");

async function comparePassword(rawPassword, hashedPassword) {
  return await bcrypt.compare(rawPassword, hashedPassword);
}

async function hashPassword(password) {
  const SALT_ROUNDS = 10;
  return await bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = { comparePassword, hashPassword };
