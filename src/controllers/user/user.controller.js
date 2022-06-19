const UserService = require("../../services/user/user.service");
const { errorResponse, successResponse } = require("../../utils");

async function register(req, res) {
  const { fullName, email, password } = req.body;
  try {
    await UserService.register(fullName, email, password);
    return successResponse(req, res, {});
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message, 400);
  }
}

module.exports = { register };
