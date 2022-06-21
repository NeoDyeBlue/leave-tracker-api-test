const issueJwt = require("./jwt.util");
const passwordUtils = require("./password.utils");
const responseUtils = require("./response.utils");

/**
 * (...) syntax spreads the other utility objects for export
 */

module.exports = {
  issueJwt,
  ...passwordUtils,
  ...responseUtils,
};
