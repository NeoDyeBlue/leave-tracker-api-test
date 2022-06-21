const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { findUserByPk } = require("../services/user/user.service");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/**
 * Gets the jsonwebtoken from cookies
 * @param {*} req
 * @returns JWT
 */

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};

const options = {
  jwtFromRequest: cookieExtractor, // ExtractJwt.fromAuthHeaderAsBearerToken() // --> from auth header as bearer
  secretOrKey: process.env.JWT_SECRET,
};

const verifyCallback = async (payload, done) => {
  try {
    const user = await findUserByPk(payload.sub);

    if (user) {
      return done(null, { sub: user.id, name: user.fullName });
    }

    return done(null, false);
  } catch (error) {
    done(error, null);
  }
};

const strategy = new JwtStrategy(options, verifyCallback);

//takes the passport library imported from app.js
module.exports = (passport) => {
  passport.use(strategy);
};
