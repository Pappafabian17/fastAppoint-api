const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('FastAppoint is working!');
});

app.use('/users', userRoutes);
app.use('/services', serviceRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})