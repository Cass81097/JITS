const validator = require('validator');

module.exports = {
    attributes: {
        email: { type: 'string', isEmail: true, minLength: 3, maxLength: 30, unique: true },
        password: { type: 'string' },
        name: { type: 'string', minLength: 3, maxLength: 20 },
        isAdmin: { type: 'boolean', defaultsTo: false },
        googleId: { type: 'string', unique: true },

        assignedTasks: {
            collection: 'task',
            via: 'assignedTo'
        },
    },

    findOrCreate: async function (criteria, record) {
        let foundUser = await User.findOne(criteria);
        if (!foundUser) {
            foundUser = await User.create(record).fetch();
        }
        return foundUser;
    },
};
