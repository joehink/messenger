const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
                        .populate({ path: "contacts", model: User })
                        .populate({ path: "pendingRequests", model: User })
                        .exec();
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id })
    if (existingUser) {
        done(null, existingUser);
    } else {
        const newUser = await new User({
            googleID: profile.id,
            fullName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileIMG: profile.photos[0].value
        }).save();
        done(null, newUser);
    }
}))