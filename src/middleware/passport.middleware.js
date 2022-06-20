const passport = require("passport");
const { successResponse, errorResponse } = require("../utils/response.utils");

/**
 * @desc Middleware function to authenticate the user locally and sends a json response instead of just status 401.
 * @see {@link https://stackoverflow.com/a/47000403|stackoverflow}
 */

function authenticate(req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      return next(error);
    }
    if (!user) {
      return errorResponse(req, res, info.message, 401, info.error); // info message and error came from the passport done/cb third parameter
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
