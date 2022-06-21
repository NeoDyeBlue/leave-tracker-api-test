const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/**
 * Issues a JWT for the user
 * @param {Object} user
 * @returns The token to be set in cookies or in the json response
 */

function issueJwt(user) {
  const EXPIRES_IN = "1d"; // 1 day;
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