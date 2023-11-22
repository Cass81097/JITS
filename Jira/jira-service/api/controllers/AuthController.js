const passport = require('passport');

module.exports = {
    googleLogin: function (req, res, next) {
        passport.authenticate('google', {
            scope: ['email', 'profile']
        })(req, res, next);
    },

    googleCallback: function (req, res, next) {
        passport.authenticate('google', { failureRedirect: '/auth/google/error' }, async (error, user, info) => {
            if (error) {
                return res.send({ message: error.message });
            }
            if (user) {
                try {
                    // your success code
                    return res.send({
                        data: result.data,
                        message: 'Login Successful'
                    });
                } catch (error) {
                    // error msg 
                    return res.send({ message: error.message });
                }
            }
        })(req, res, next);
    }
};
