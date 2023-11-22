const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('./NodemailerController');
module.exports = {
    signup: async function (req, res) {
        try {
            // if (!validator.isLength(req.body.name, { min: 3 })) {
            //     return res.badRequest({ message: 'Name must have at least 3 characters' });
            // }

            // if (!validator.isEmail(req.body.email)) {
            //     return res.badRequest({ message: 'Invalid email address' });
            // }

            // if (!validator.isLength(req.body.password, { min: 4 })) {
            //     return res.badRequest({ message: 'Password must have at least 4 characters' });
            // }

            let existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email is already registered' });
            }

            // Tạo mật khẩu ngẫu nhiên
            let randomPassword = crypto.randomBytes(6).toString('hex');
            let hashedPassword = await bcrypt.hash(randomPassword, 10);

            // Tạo người dùng mới
            let newUser = await User.create({
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name,
                isAdmin: req.body.isAdmin || false
            }).fetch();

            // Gửi email với mật khẩu
            await sendEmail(
                newUser.email,
                'Welcome to Our App',
                `Your password is: ${randomPassword}`
            );

            delete newUser.password;
            return res.ok({ user: newUser, message: 'User created successfully' });
        } catch (err) {
            return res.serverError(err);
        }
    },

    login: async function (req, res) {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send({ message: 'Email not found' });
            }

            let match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.forbidden({ message: 'Invalid email or password' });
            }

            if (!process.env.JWT_SECRET_KEY) {
                return res.serverError(new Error('Secret key not defined'));
            }

            let token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
            let userResponse = Object.assign({}, user);
            delete userResponse.password;

            return res.ok({ user: userResponse, token: token });


        } catch (err) {
            return res.serverError(err);
        }
    }
};
