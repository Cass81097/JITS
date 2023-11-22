let jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization header found.' });

  }
  let token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: 'Invalid Token!' });
    }
    req.user = decoded;
    return next();
  });
};
