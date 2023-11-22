const validator = require('validator');

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 50
        },

        description: {
            type: 'string',
            maxLength: 500
        },

        startDate: {
            type: 'ref',
            columnType: 'datetime',
            custom: function (value) {
                return validator.isDate(value);
            }
        },

        dueDate: {
            type: 'ref',
            columnType: 'datetime',
            custom: function (value) {
                return validator.isDate(value);
            }
        },

        status: {
            type: 'string',
            isIn: ['active', 'review', 'completed']
        },

        createdBy: { model: 'user' },

        tasks: {
            collection: 'task',
            via: 'project'
        },
    },

    beforeCreate: function (values, proceed) {
        if (values.startDate && values.dueDate && new Date(values.startDate) > new Date(values.dueDate)) {
            return proceed(new Error('startDate cannot be after dueDate'));
        }
        return proceed();
    }
};
