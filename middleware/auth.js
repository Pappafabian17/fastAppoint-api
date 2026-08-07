const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    error: {
      message: 'Unauthorized. Please log in first.',
      status: 401
    }
  });
};

module.exports = {
  isAuthenticated
};
