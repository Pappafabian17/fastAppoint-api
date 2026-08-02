const swaggerAutogen = require('swagger-autogen')();


const host = process.env.RENDER_EXTERNAL_URL 
  ? process.env.RENDER_EXTERNAL_URL.replace(/^https?:\/\//, '') 
  : 'localhost:3000';

const schemes = process.env.RENDER_EXTERNAL_URL ? ['https'] : ['http'];

const doc = {
  info: {
    title: 'FastAppoint API',
    description: 'Backend API for FastAppoint - Booking management system',
  },
  host: host,
  schemes: schemes 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
