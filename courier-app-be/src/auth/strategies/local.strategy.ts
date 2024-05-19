import passport from "passport";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
import db from "../../db";
import { User } from "../../db/models/User";

passport.use(
  new passportLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      db.manager
        .findOneBy(User, { email: email.toLowerCase() })
        .then(async (user) => {
          if (user?.password) {
            const isMatching = await bcrypt.compare(password, user.password);
            if (isMatching) {
              return cb(null, user, { message: "Logged In Successfully" });
            }
          }
          cb(null, false, { message: "Incorrect email or password." });
        });
    }
  )
);
