require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('test routes', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('can create a meme using /POST', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({ top: 'This is', bottom: 'a meme.', image: 'https://i.imgur.com/YXoqo5i.jpg' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'This is',
          bottom: 'a meme.',
          image: 'https://i.imgur.com/YXoqo5i.jpg',
          __v: 0
        });
      });
  });

  it('can get all memes using /GET', async() => {
    const meme = await Meme.create({ top: 'Elon', bottom: 'Musk', image: 'https://github.com/alchemy-fullstack-js-summer-2019/my-human-behaviors/blob/master/lib/routes/habits.js' });

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual(memeJSON);
      });
  });
});
