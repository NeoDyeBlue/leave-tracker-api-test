const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { findOneUser, findUserByPk } = require("../services/user/user.service");
const { comparePassword } = require("../utils");

const customFields = { usernameField: "email" }; //tell passport that the username is the email field

const verifyCallback = async (username, password, done) => {
  console.log(username, password);
  try {
    const user = await findOneUser({ email: username });

    if (!user) {
      return done(null, false, {
        error: "EmailNotFound",
        message: "email/user is not found",
      });
    }

    const isValid = await comparePassword(password, user.password); // checks if password is valid

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, {
        error: "PasswordIncorrect",
        message: "incorrect password",
      });
    }
  } catch (error) {
    done(error);
  }
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await findUserByPk(userId);
    done(null, { id: user.id, email: user.email, name: user.fullName });
  } catch (err) {
    done(error);
  }
});
