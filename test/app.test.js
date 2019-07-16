require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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
});
