const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', (req, res, next) => {
  // #swagger.tags = ['Authentication']
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  // #swagger.tags = ['Authentication']
  passport.authenticate('google', {
    successRedirect: '/auth/login-success',
    failureRedirect: '/auth/login-failure'
  })(req, res, next);
});

router.get('/login-success', (req, res) => {
  // #swagger.tags = ['Authentication']
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Successfully authenticated',
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
});

router.get('/login-failure', (req, res) => {
  // #swagger.tags = ['Authentication']
  res.status(401).json({
    success: false,
    message: 'Authentication failed'
  });
});

router.get('/logout', (req, res, next) => {
  // #swagger.tags = ['Authentication']
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: 'Successfully logged out'
    });
  });
});

module.exports = router;
