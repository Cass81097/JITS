const validator = require('validator');

module.exports = {
    attributes: {
        email: { type: 'string', required: true, isEmail: true, minLength: 3, maxLength: 30, unique: true },
        password: { type: 'string', required: true },
        name: { type: 'string', required: true, minLength: 3, maxLength: 20},
        isAdmin: { type: 'boolean', defaultsTo: false },

        assignedTasks: {
            collection: 'task',
            via: 'assignedTo'
        },
    },
};
