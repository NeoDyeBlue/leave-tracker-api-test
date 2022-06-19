const { User } = require("../../models");
const { comparePassword } = require("../../utils");

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

module.exports = {
  register,
  login,
};
