const express = require('express');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('../swagger.json'); 

const userRoutes = require('./users'); 
const serviceRoutes = require('./services'); 

const router = express.Router();

router.use('/users', userRoutes);
router.use('/services', serviceRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
