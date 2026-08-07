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
  schemes: schemes,
  definitions: {
    User: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'client'
    },
    Service: {
      title: 'Premium Haircut',
      description: 'Professional haircut, wash, and styling.',
      durationMinutes: 45,
      price: 35.0,
      category: 'Beauty',
      providerId: '6a7522059ed31a5944b78ac2'
    },
    Appointment: {
      clientId: '6a7522059ed31a5944b78ac2',
      serviceId: '6a7522059ed31a5944b78ac1',
      providerId: '6a7522059ed31a5944b78ac0',
      appointmentDate: '2026-08-15T14:30:00Z',
      status: 'pending',
      notes: 'Please wash hair with cold water.'
    },
    Review: {
      appointmentId: '6a7522059ed31a5944b78ac9',
      serviceId: '6a7522059ed31a5944b78ac1',
      clientId: '6a7522059ed31a5944b78ac2',
      rating: 5,
      comment: 'Excellent service! Highly recommended.'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
