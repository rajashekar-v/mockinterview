require('dotenv').config();
const express = require('express');
const app = express();
const Users = require('./routes/users');
const bodyParser = require('body-parser');
const responseMiddleware = require('./middleware/responseMiddleware');

app.use(bodyParser.json());
app.use(responseMiddleware);
app.use("/user",Users);

module.exports = app;