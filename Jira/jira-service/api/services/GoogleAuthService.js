const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '900981223090-44h951d0o3i1ekqftvnsaj430s158nn3.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:1337/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            // console.log(profile);
            const googleId = profile.id; 
            const name = profile.displayName; 
            let user = await User.findOne({ googleId: googleId, name: name });

            if (!user) {
                user = await User.create({ googleId: googleId, name: name }).fetch();
            }

            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }

));
