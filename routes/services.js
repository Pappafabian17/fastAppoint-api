const express = require('express');
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/services');

const validate = require('../middleware/validate');
const {
  serviceIdValidation,
  createServiceValidation,
  updateServiceValidation
} = require('../middleware/serviceValidator');

const router = express.Router();

router.get('/', getAllServices);

router.get('/:id', serviceIdValidation, validate, getServiceById);

router.post('/', createServiceValidation, validate, createService);

router.put('/:id', updateServiceValidation, validate, updateService);

router.delete('/:id', serviceIdValidation, validate, deleteService);

module.exports = router;
