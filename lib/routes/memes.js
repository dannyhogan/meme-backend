const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      top,
      bottom,
      image
    } = req.body;

    Meme
      .create({ top, bottom, image })
      .then(meme => res.send(meme))
      .catch(next);
  });
