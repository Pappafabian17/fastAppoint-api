const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
  res.send("FastAppoint is working!");
});

app.listen(PORT, ()=>{
  console.log(`Server is running on PORT: ${PORT}`)
})