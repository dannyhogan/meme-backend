const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/memes', require('./routes/memes'));

module.exports = app;
