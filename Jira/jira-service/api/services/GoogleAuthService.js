const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '900981223090-44h951d0o3i1ekqftvnsaj430s158nn3.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:1337/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const googleId = profile.id; 
   
            let user = await User.findOne({ googleId: googleId });

            if (!user) {
                // Nếu không tìm thấy người dùng, tạo mới người dùng
                user = await User.create({ googleId: googleId, /* Các thuộc tính khác */ }).fetch();
            }

            console.log(user, "user");
            console.log(googleId, "googleId");
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }

));
