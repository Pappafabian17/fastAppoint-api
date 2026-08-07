const { body, param } = require('express-validator');

const reviewIdValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format')
];

const createReviewValidation = [
  body('appointmentId').isMongoId().withMessage('Invalid Appointment ID format'),
  body('serviceId').isMongoId().withMessage('Invalid Service ID format'),
  body('clientId').isMongoId().withMessage('Invalid Client ID format'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required').trim()
];

const updateReviewValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format'),
  body('appointmentId').optional().isMongoId().withMessage('Invalid Appointment ID format'),
  body('serviceId').optional().isMongoId().withMessage('Invalid Service ID format'),
  body('clientId').optional().isMongoId().withMessage('Invalid Client ID format'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('comment').optional().notEmpty().withMessage('Comment cannot be empty').trim()
];

module.exports = {
  reviewIdValidation,
  createReviewValidation,
  updateReviewValidation
};
