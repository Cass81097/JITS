module.exports = {
    verifyProjectOwner: async function (req, res, proceed) {
        const projectId = req.body.project || req.params.project;
        const currentUser = req.user;

        console.log(currentUser);

        if (!projectId) {
            return { error: 'Missing project ID' };
        }

        const project = await Project.findOne({ id: projectId });
        console.log(project, "project");
        if (!project) {
            return { error: 'Project not found' };
        }

        if (project.createdBy !== currentUser.id) {
            return { error: 'You are not the owner of this project' };
        }
        return null; 
    }
};
