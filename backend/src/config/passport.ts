// import passport from "passport";
// import { Strategy as JwtStrategry, ExtractJwt } from "passport-jwt";
// import { authenticationError } from "../utils/error";
// import { findByUserService } from "../lib/user";

// passport.use(
//   new JwtStrategry(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => {
//           const token = req.cookies.accessToken;
//           if (!token) throw authenticationError("Unauthorized access");
//           return token;
//         },
//       ]),
//       secretOrKey: process.env.JWT_SECRET || "default_secret",
//       audience: ["user"],
//       algorithms: ["HS256"],
//     },
//     async ({ userId }, done) => {
//       try {
//         const user = userId && (await findByUserService(userId));
//         return done(null, user || false);
//       } catch (error) {
//         return done(null, false);
//       }
//     }
//   )
// );

// export const passportAuthenticateJwt = passport.authenticate("jwt", {
//   session: false,
// });

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { authenticationError } from "../utils/error";
import { findByUserService, findOrCreateGoogleUserService } from "../lib/user";

/* ========================
      JWT STRATEGY
======================== */
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const token = req.cookies.accessToken;
          if (!token) throw authenticationError("Unauthorized access");
          return token;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET || "default_secret",
      audience: ["user"],
      algorithms: ["HS256"],
    },
    async ({ userId }, done) => {
      try {
        const user = userId && (await findByUserService(userId));
        return done(null, user || false);
      } catch (error) {
        return done(null, false);
      }
    }
  )
);

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});

/* ========================
    GOOGLE OAUTH STRATEGY
======================== */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await findOrCreateGoogleUserService(profile);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
