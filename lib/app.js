const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors);

app.use('/api/v1/memes', require('./routes/memes'));

app.use(require('../lib/middleware/not-found'));
app.use(require('../lib/middleware/error'));

module.exports = app;
