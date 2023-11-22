// const validator = require('validator');

// module.exports = {
//     validateTask: (task) => {
//         const errors = {};

//         if (!validator.isLength(task.title, { min: 1 }, { max: 20 })) {
//             errors.title = 'Title is required';
//         }

//         if (task.description && !validator.isLength(task.description, { min: 1 }, { max: 500 })) {
//             errors.description = 'Invalid description';
//         }

//         if (task.status && !validator.isIn(task.status, ['todo', 'in-progress', 'review', 'done'])) {
//             errors.status = 'Invalid status';
//         }

//         if (task.startDate && task.dueDate) {
//             if (!validator.isDate(task.startDate) || !validator.isDate(task.dueDate)) {
//                 errors.date = 'Invalid date format for startDate or dueDate';
//             }
//             if (new Date(task.startDate) > new Date(task.dueDate)) {
//                 errors.dateLogic = 'startDate cannot be after dueDate';
//             }
//         }

//         if (task.storyPoints && !validator.isNumeric(task.storyPoints.toString())) {
//             errors.storyPoints = 'Story points must be a number';
//         }

//         return errors;
//     },

//     validateProject: (project) => {
//         const errors = {};

//         if (!validator.isLength(project.name, { min: 3 }, { max: 20 })) {
//             errors.name = 'Name must have at least 3 characters';
//         }

//         if (project.description && !validator.isLength(project.description, { min: 1 }, { max: 500 })) {
//             errors.description = 'Description is required';
//         }

//         if (project.startDate && project.dueDate) {
//             if (!validator.isDate(project.startDate) || !validator.isDate(project.dueDate)) {
//                 errors.date = 'Invalid date format for startDate or dueDate';
//             }
//             if (new Date(project.startDate) > new Date(project.dueDate)) {
//                 errors.dateLogic = 'startDate cannot be after dueDate';
//             }
//         }

//         if (project.status && !validator.isIn(project.status, ['active', 'review', 'completed'])) {
//             errors.status = 'Invalid status';
//         }

//         return errors;
//     },
// };
