const { body, param } = require('express-validator');

const appointmentIdValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format')
];

const createAppointmentValidation = [
  body('clientId').isMongoId().withMessage('Invalid Client ID format'),
  body('serviceId').isMongoId().withMessage('Invalid Service ID format'),
  body('providerId').isMongoId().withMessage('Invalid Provider ID format'),
  body('appointmentDate')
    .isISO8601()
    .withMessage('Appointment date must be a valid ISO 8601 date format'),
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'canceled'])
    .withMessage('Status must be pending, confirmed, completed, or canceled'),
  body('notes').optional().isString().trim()
];

const updateAppointmentValidation = [
  param('id').isMongoId().withMessage('Invalid MongoDB ID format'),
  body('clientId').optional().isMongoId().withMessage('Invalid Client ID format'),
  body('serviceId').optional().isMongoId().withMessage('Invalid Service ID format'),
  body('providerId').optional().isMongoId().withMessage('Invalid Provider ID format'),
  body('appointmentDate')
    .optional()
    .isISO8601()
    .withMessage('Appointment date must be a valid ISO 8601 date format'),
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'canceled'])
    .withMessage('Status must be pending, confirmed, completed, or canceled'),
  body('notes').optional().isString().trim()
];

module.exports = {
  appointmentIdValidation,
  createAppointmentValidation,
  updateAppointmentValidation
};
