let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = {

    signup: async function (req, res) {
        try {
            let hashedPassword = await bcrypt.hash(req.body.password, 10);

            let newUser = await User.create({
                username: req.body.username,
                password: hashedPassword,
                isAdmin: req.body.isAdmin || false
            }).fetch();

            return res.ok({ user: newUser, message: 'User created successfully' });
        } catch (err) {
            return res.serverError(err);
        }
    },

    login: async function (req, res) {
        try {
            let user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.notFound({ message: 'User not found' });
            }

            let match = await bcrypt.compare(req.body.password, user.password);

            if (!match) {
                return res.forbidden({ message: 'Invalid username or password' });
            }

            let token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'YOUR_SECRET_KEY', { expiresIn: '2h' });

            return res.ok({ user: user, token: token });
        } catch (err) {

            return res.serverError(err);
        }
    }

}

