module.exports.routes = {
    '/': { view: 'pages/homepage' },

    // Product
    // 'GET /product/:id1/:id2': 'ProductController.read',
    'DELETE /product-delete': 'ProductController.deleteAll',
    'GET /product/caculate': 'ProductController.calculate',

    // User
    'POST /signup': 'UserController.signup',
    'POST /login': 'UserController.login',
    'GET /testcors': 'TestController.testcors',
    
};
