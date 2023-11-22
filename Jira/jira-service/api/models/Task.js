const validator = require('validator');

module.exports = {
    attributes: {
        title: {
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 50
        },

        description: {
            type: 'string',
            minLength: 1,
            maxLength: 500
        },

        status: {
            type: 'string',
            isIn: ['todo', 'in-progress', 'review', 'done']
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

        storyPoints: {
            type: 'number',
            isInteger: true 
        },

        project: { model: 'project' },
        assignedTo: { collection: 'user', via: 'assignedTasks' },
    },

    beforeCreate: function (values, proceed) {
        if (values.startDate && values.dueDate && new Date(values.startDate) > new Date(values.dueDate)) {
            return proceed(new Error('startDate cannot be after dueDate'));
        }
        return proceed();
    }
};
