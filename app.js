const express = require('express');
const cors = require('cors');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'temporary_session_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('FastAppoint API is working!');
});

app.use('/', routes);
app.use(errorHandler);

module.exports = app;
