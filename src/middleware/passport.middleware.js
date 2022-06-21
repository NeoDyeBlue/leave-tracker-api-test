const passport = require("passport");
const { errorResponse } = require("../utils/response.utils");

/**
 * Custom passport middleware function for authenticating users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @see {@link https://stackoverflow.com/q/43293707 | create a custom passport-jwt strategy middleware callback}
 */

function authenticate(req, res, next) {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return errorResponse(req, res, "unauthorized", 401, "UNAUTHORIZED_USER"); // info message and error came from the passport done/cb third argument
    }
    req.user = user;
    next();
  })(req, res, next);
}

function viewAuthenticate(req, res, next) {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect("/login");
    }
    next();
  })(req, res, next);
}

module.exports = { authenticate, viewAuthenticate };
