let jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    // return res.unauthorized({ message: 'No authorization header found.' });
    return res.status(401).send({ message: 'No authorization header found.' });

  }

  let token = req.headers.authorization.split(' ')[1]; 

  jwt.verify(token, 'YOUR_SECRET_KEY', function(err, decoded) {
    if (err) {
      // return res.unauthorized({ message: 'Invalid Token!' });
      return res.status(401).send({ message: 'Invalid Token!'});

    }
    req.user = decoded; 
    return next();
  });
};
