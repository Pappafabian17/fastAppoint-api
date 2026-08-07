const express = require('express');
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointments');

const validate = require('../middleware/validate');
const {
  appointmentIdValidation,
  createAppointmentValidation,
  updateAppointmentValidation
} = require('../middleware/appointmentValidator');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllAppointments);
router.get('/:id', appointmentIdValidation, validate, getAppointmentById);
router.post('/', isAuthenticated, createAppointmentValidation, validate, createAppointment);
router.put('/:id', isAuthenticated, updateAppointmentValidation, validate, updateAppointment);
router.delete('/:id', isAuthenticated, appointmentIdValidation, validate, deleteAppointment);

module.exports = router;
