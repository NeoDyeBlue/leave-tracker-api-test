const UserService = require("../../services/user/user.service");
const {
  issueJwt,
  errorResponse,
  successResponse,
  setCookie,
} = require("../../utils");

/**
 * Register controller for user
 * @returns Will return a succes or error json response
 */

async function register(req, res) {
  const { fullName, email, password } = req.body;
  try {
    const user = await UserService.register(fullName, email, password);
    const jwt = issueJwt(user);

    // remove set cookie if localStorage is preffered

    setCookie(req, res, "jwt", jwt.cookie.token, {
      httpOnly: true,
      secure: false, // --> set secure to true in production
    });

    return successResponse(req, res, {
      user: { id: user.id, name: user.fullName },
      // // Uncomment this part if token should be included in the json response
      // token: jwt.local.token,
      // expiresIn: jwt.local.expires,
    });
  } catch (error) {
    return errorResponse(req, res, error.message, 400);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserService.login(email, password);
    const jwt = issueJwt(user);

    // remove set cookie if localStorage is preffered

    setCookie(req, res, "jwt", jwt.cookie.token, {
      httpOnly: true,
      secure: false, // --> set secure to true in production
    });

    return successResponse(req, res, {
      user: { id: user.id, name: user.fullName },
      // // Uncomment this part if token should be included in the json response
      // token: jwt.local.token,
      // expiresIn: jwt.local.expires,
    });
  } catch (error) {
    return errorResponse(req, res, error.message, 400);
  }
}

module.exports = { register, login };
