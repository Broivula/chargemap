'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');
const stationRoute = require('./routes/stationRoute');
const authenticator = require('./controllers/authenticator.js').authenticate;
const authRoute = require('./routes/authRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/station', authenticator, stationRoute);
app.use('/auth', authRoute);

db.on('connected', () => {
  app.listen(3000);
});
