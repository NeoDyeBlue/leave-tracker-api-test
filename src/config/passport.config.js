/**
 * This passport configuration uses the jwt and google strategies.
 *
 * By using jwt, we don't need express-session anymore to store sessions.
 *
 * @see {@link https://www.sitepoint.com/spa-social-login-google-facebook/ | Add Social Login via Google & Facebook to Your Single-page App}
 */

const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const {
  findUserByPk,
  findUpdateOrCreateUser,
} = require("../services/user/user.service");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/**
 * Gets the jsonwebtoken from cookies
 * @param {*} req
 * @returns JWT - the token from the cookie
 */

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};

/**
 * -------------- DEFINE STRATEGIES ----------------
 */

/**
 * JWT strategy
 */

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor, // ExtractJwt.fromAuthHeaderAsBearerToken() // --> from auth header as bearer
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await findUserByPk(payload.sub);
      console.log("payload", payload);
      if (user) {
        return done(
          null,
          { id: user.id, name: user.fullName, email: user.email },
          payload
        );
      }

      return done(null, false);
    } catch (error) {
      done(error, null);
    }
  }
);

/**
 * Google strategy
 */

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    // passReqToCallback: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findUpdateOrCreateUser(profile);
      return done(null, { id: user.id, fullName: user.fullName });
    } catch (error) {
      done(error, null);
    }
  }
);

/**
 *
 * @param {*} passport takes the passport library imported from app.js
 */
module.exports = (passport) => {
  passport.use(jwtStrategy);
  passport.use(googleStrategy);
};
