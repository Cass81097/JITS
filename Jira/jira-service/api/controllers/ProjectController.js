module.exports = {

    createProject: async function (req, res) {
        try {
            let newProject = await Project.create({
                name: req.body.name,
                description: req.body.description,
                startDate: req.body.startDate,
                dueDate: req.body.dueDate,
                status: req.body.status || 'active',
                createdBy: req.user.id
            }).fetch();

            return res.ok(newProject);
        } catch (err) {
            if (err.name === 'UsageError') {
                return res.badRequest(err);
            }
            return res.serverError(err);
        }
    },


    // Cập Nhật Project
    updateProject: async function (req, res) {
        try {
            const projectId = req.params.id;

            let updatedProject = await Project.updateOne({ id: projectId }).set({
                name: req.body.name,
                description: req.body.description,
                startDate: req.body.startDate,
                dueDate: req.body.dueDate,
                status: req.body.status
            });

            if (!updatedProject) {
                return res.status(400).send({ error: 'Project not found' });
            }

            return res.ok(updatedProject);
        } catch (err) {
            if (err.name === 'UsageError') {
                return res.badRequest(err);
            }
            return res.serverError(err);
        }
    },

    // Xóa Project và tất cả các Task liên quan
    deleteProject: async function (req, res) {
        try {
            const projectId = req.params.id;

            const project = await Project.findOne({ id: projectId });
            if (!project) {
                return res.ok({ message: 'Project not found' });
            }

            // Xóa Task trong Project
            await Task.destroy({ project: projectId });
            await Project.destroyOne({ id: projectId });

            return res.ok({ message: 'Project and all related tasks deleted successfully' });
        } catch (err) {
            return res.serverError(err);
        }
    },


    // Lấy Danh Sách Các Project
    listProjects: async function (req, res) {
        try {
            let projects = await Project.find();
            return res.ok(projects);
        } catch (err) {
            return res.serverError(err);
        }
    },

    // Lấy thông tin Project theo ID và hiển thị các Task liên quan
    getProject: async function (req, res) {
        try {
            const projectId = req.params.id;
            let project = await Project.findOne({ id: projectId }).populate('tasks');
            if (!project) {
                return res.ok({ message: 'Project not found' });
            }

            return res.ok(project);
        } catch (err) {
            return res.serverError(err);
        }
    },

};
