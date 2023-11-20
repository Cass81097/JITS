module.exports.routes = {
    '/': { view: 'pages/homepage' },

    // Product
    'GET /calculate-price': 'ProductController.calculate',

    // User
    'POST /signup': 'UserController.signup',
    'POST /login': 'UserController.login',
};
