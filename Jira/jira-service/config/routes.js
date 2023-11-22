module.exports.routes = {
  '/': { view: 'pages/homepage' },

  // User
  'POST /signup': 'UserController.signup',
  'POST /login': 'UserController.login',

  // Project 
  'POST /project': 'ProjectController.createProject',
  'PATCH /project/:id': 'ProjectController.updateProject',
  'DELETE /project/:id': 'ProjectController.deleteProject',
  'GET /projects': 'ProjectController.listProjects',
  'GET /project/:id': 'ProjectController.getProject',

  //Task
  'POST /task': 'TaskController.createTask',
  'PATCH /task/:id': 'TaskController.updateTask',
  'GET /task/:id': 'TaskController.getTask',
  'GET /tasks': 'TaskController.getAllTasks',
  'DELETE /task/:id': 'TaskController.deleteTask',
  'GET /task/search': 'TaskController.searchTasks',
};
