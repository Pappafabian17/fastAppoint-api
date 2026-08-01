const { body, param } = require('express-validator'); 
const userIdValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format')
];
const createUserValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Must be a valid email address').normalizeEmail(),
  body('role')
    .optional()
    .isIn(['client', 'provider', 'admin'])
    .withMessage('Role must be client, provider, or admin')
];
const updateUserValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty').trim(),
  body('email').optional().isEmail().withMessage('Must be a valid email address').normalizeEmail(),
  body('role')
    .optional()
    .isIn(['client', 'provider', 'admin'])
    .withMessage('Role must be client, provider, or admin')
];

module.exports = {
  userIdValidation,
  createUserValidation,
  updateUserValidation
};
