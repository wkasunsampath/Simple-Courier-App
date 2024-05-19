import passport from "passport";
import passportJWT from "passport-jwt";

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_KEY ?? "",
    },
    function (jwtPayload, cb) {
      cb(null, jwtPayload);
    }
  )
);
