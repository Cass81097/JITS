module.exports = function(req, res, next) {
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.forbidden('You need admin rights to perform this action.');
  };