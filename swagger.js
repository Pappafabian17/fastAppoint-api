const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'FastAppoint API',
    description: 'Backend API for FastAppoint - Booking management system',
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
