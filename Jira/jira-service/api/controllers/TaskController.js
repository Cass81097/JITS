const { verifyProjectOwner } = require('../services/projectService');

module.exports = {
    createTask: async function (req, res) {
        try {
            const verifyError = await verifyProjectOwner(req, res);
            if (verifyError) {
                return res.status(400).send({ error: verifyError.error }); // Send a custom response with a 400 status code
            }

            let newTask = await Task.create(req.body).fetch();
            return res.ok(newTask);
        } catch (err) {
            if (err.name === 'UsageError') {
                return res.badRequest(err);
            }
            return res.serverError(err);
        }
    },

    updateTask: async function (req, res) {
        try {
            let taskId = req.params.id;
            let updatedTask = await Task.updateOne({ id: taskId }).set(req.body);
            if (updatedTask) {
                return res.ok(updatedTask);
            } else {
                return res.status(400).send({ error: 'Task not found' });
            }
        } catch (err) {
            if (err.name === 'UsageError') {
                return res.badRequest(err);
            }
            return res.serverError(err);
        }
    },

    getTask: async function (req, res) {
        try {
            const taskId = req.params.id;
            const task = await Task.findOne({ id: taskId }).populate('assignedTo');
            if (!task) {
                return res.status(400).send({ error: 'Task not found' });
            }
            return res.ok(task);
        } catch (err) {
            return res.serverError(err);
        }
    },

    getAllTasks: async function (req, res) {
        try {
            const tasks = await Task.find().populate('assignedTo');
            return res.ok(tasks);
        } catch (err) {
            return res.serverError(err);
        }
    },

    deleteTask: async function (req, res) {
        try {
            const verifyError = await verifyProjectOwner(req, res);
            if (verifyError) {
                return res.status(400).send({ error: verifyError.error }); // Send a custom response with a 400 status code
            }

            const taskId = req.params.id;
            const deletedTask = await Task.destroyOne({ id: taskId });
            if (!deletedTask) {
                return res.status(400).send({ error: 'Task not found' });
            }
            return res.ok({ message: 'Task deleted successfully' });
        } catch (err) {
            return res.serverError(err);
        }
    },

    searchTasks: async function (req, res) {
        try {
            const { title, status, assigned } = req.query;
            let whereClause = {};

            if (title) {
                whereClause.title = { contains: title };
            }
            if (status) {
                whereClause.status = status;
            }
            if (assigned) {
                const assignedId = parseInt(assigned);
                if (!isNaN(assignedId)) {
                    whereClause.assignedTo = assignedId;
                }
            }

            const tasks = await Task.find(whereClause).populate('assignedTo');

            return res.ok(tasks);
        } catch (err) {
            return res.serverError(err);
        }
    }


}