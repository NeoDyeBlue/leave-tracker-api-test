const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const { comparePassword } = require("../utils");

const customFields = { usernameField: "email" }; //tell passport that the username field is the email field
const verifyCallback = async (username, password, done) => {
  console.log(username, password);
  try {
    const user = await User.findOne({ where: { email: username } });

    if (!user) {
      return done(null, false); //if there is no user on login return result (null no error, success is false)
    }

    const isValid = await comparePassword(password, user.password); // check if password is valid

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
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
    const user = await User.findByPk(userId);
    done(null, { id: user.id, email: user.email, name: user.fullName });
  } catch (err) {
    done(error);
  }
});
