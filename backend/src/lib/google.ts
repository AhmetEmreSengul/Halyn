import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import { ENV } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID!,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET!,
      callbackURL: ENV.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const avatar = profile.photos?.[0]?.value || "";

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        if (email) {
          user = await User.findOne({ email });

          if (user) {
            user.googleId = profile.id;
            user.avatar = avatar || user.avatar;
            user.authProvider = "google";
            await user.save();

            return done(null, user);
          }

          user = await User.create({
            googleId: profile.id,
            email,
            fullName: profile.displayName,
            avatar,
            authProvider: "google",
          });

          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);

export default passport;
