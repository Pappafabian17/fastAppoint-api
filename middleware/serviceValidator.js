const { body, param } = require('express-validator'); 
const serviceIdValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format')
];
const createServiceValidation = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('description').notEmpty().withMessage('Description is required').trim(),
  body('durationMinutes')
    .isInt({ min: 1 })
    .withMessage('Duration must be an integer and at least 1 minute'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required').trim(),
  body('providerId').isMongoId().withMessage('Invalid Provider MongoDB ID format')
];


const updateServiceValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').trim(),
  body('description').optional().notEmpty().withMessage('Description cannot be empty').trim(),
  body('durationMinutes')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be an integer and at least 1 minute'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty').trim(),
  body('providerId').optional().isMongoId().withMessage('Invalid Provider MongoDB ID format')
];

module.exports = {
  serviceIdValidation,
  createServiceValidation,
  updateServiceValidation
};
