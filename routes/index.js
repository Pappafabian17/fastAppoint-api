const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const userRoutes = require('./users');
const serviceRoutes = require('./services');
const appointmentRoutes = require('./appointments');
const reviewRoutes = require('./reviews');
const authRoutes = require('./auth');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/auth', authRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
