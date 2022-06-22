const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const { cookieMaxAge } = require("../config/config");
require("dotenv").config();

/**
 * Issues a JWT for the user
 * @param {Object} user
 * @returns The token to be set in cookies or in the json response
 */

function issueJwt(user) {
  const EXPIRES_IN = cookieMaxAge;
  const payload = {
    sub: user.id,
    name: user.fullName,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });

  return {
    local: {
      token: `Bearer ${signedToken}`,
      expires: EXPIRES_IN,
    },
    cookie: {
      token: signedToken,
    },
  };
}

module.exports = issueJwt;
