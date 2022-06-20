const passport = require("passport");
const { successResponse, errorResponse } = require("../utils/response.utils");

/**
 * Middleware function to authenticate the user locally and sends a json response instead of just status 401.
 * @see {@link https://stackoverflow.com/q/24382296|how to send json as a response after passport authenticationin node.js}
 * @see {@link https://stackoverflow.com/q/49030707|how to send json data under passport local strategy}
 * @returns Sends a json success/error response
 */

function authenticate(req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      return next(error);
    }
    if (!user) {
      return errorResponse(req, res, info.message, 401, info.error); // info message and error came from the passport done/cb third argument
    }

    req.login(user, function (error) {
      if (error) {
        return next(error);
      }
      return successResponse(
        req,
        res,
        { id: user.id, fullName: user.fullName, email: user.email },
        200
      );
    });
  })(req, res, next);
}

/**
 * Checks if a user is authenticated
 * @returns An error json response
 */

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return errorResponse(
      req,
      res,
      "You are not authorized to view this resource",
      401
    );
  }
}

module.exports = { authenticate, isAuthenticated };
